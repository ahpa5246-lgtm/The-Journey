import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const OVERPASS_URL = process.env.OVERPASS_URL || "https://overpass-api.de/api/interpreter";
const OUTPUT = resolve(process.cwd(), "public/data/osm-candidates.json");
const MAX_ITEMS = Number(process.env.OSM_MAX_ITEMS || 5000);

const query = `
[out:json][timeout:120];
area["ISO3166-1"="IQ"][admin_level=2]->.searchArea;
(
  nwr["name"]["historic"](area.searchArea);
  nwr["name"]["tourism"~"^(attraction|museum|hotel|guest_house|hostel|viewpoint|camp_site)$"](area.searchArea);
  nwr["name"]["amenity"~"^(restaurant|cafe)$"](area.searchArea);
  nwr["name"]["leisure"~"^(park|garden|water_park|theme_park)$"](area.searchArea);
);
out center tags;
`;

function classify(tags = {}) {
  if (tags.historic || ["attraction", "museum"].includes(tags.tourism)) return "heritage";
  if (["hotel", "guest_house", "hostel", "camp_site"].includes(tags.tourism)) return "stay";
  if (["restaurant", "cafe"].includes(tags.amenity)) return "food";
  if (tags.leisure || tags.tourism === "viewpoint") return "nature";
  return "culture";
}

function normalize(element) {
  const tags = element.tags || {};
  const lat = element.lat ?? element.center?.lat ?? null;
  const lon = element.lon ?? element.center?.lon ?? null;
  if (lat == null || lon == null) return null;

  return {
    id: `osm:${element.type}:${element.id}`,
    osmType: element.type,
    osmId: element.id,
    name: {
      en: tags["name:en"] || tags.name || null,
      ar: tags["name:ar"] || tags.name || null,
      local: tags.name || null,
    },
    category: classify(tags),
    location: { lat, lon },
    governorateHint: tags["addr:state"] || tags["addr:province"] || null,
    details: {
      website: tags.website || tags["contact:website"] || null,
      phone: tags.phone || tags["contact:phone"] || null,
      openingHours: tags.opening_hours || null,
      cuisine: tags.cuisine || null,
      tourism: tags.tourism || null,
      historic: tags.historic || null,
      amenity: tags.amenity || null,
      leisure: tags.leisure || null,
    },
    provenance: {
      source: "OpenStreetMap via Overpass API",
      sourceUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
      license: "ODbL 1.0",
      importedAt: new Date().toISOString(),
    },
    publication: {
      status: "candidate",
      verified: false,
      note: "Candidate only. Human review and a supporting source are required before publishing as a verified listing.",
    },
  };
}

async function main() {
  const body = new URLSearchParams({ data: query });
  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      "user-agent": "The-Journey-Iraq/0.1 (tourism discovery data refresh)",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Overpass request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  const seen = new Set();
  const items = [];

  for (const element of payload.elements || []) {
    const item = normalize(element);
    if (!item || seen.has(item.id)) continue;
    seen.add(item.id);
    items.push(item);
    if (items.length >= MAX_ITEMS) break;
  }

  const output = {
    generatedAt: new Date().toISOString(),
    status: "candidate-data-only",
    source: "OpenStreetMap contributors via Overpass API",
    sourceUrl: "https://www.openstreetmap.org/copyright",
    license: "ODbL 1.0",
    policy: "This file feeds a review queue. It must not be treated as an endorsed or safety-verified catalogue.",
    count: items.length,
    items,
  };

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${items.length} OSM candidates to ${OUTPUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
