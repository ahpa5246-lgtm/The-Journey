import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const INPUT = resolve(process.cwd(), "public/data/official-sources.json");
const OUTPUT = resolve(process.cwd(), "public/data/source-health.json");
const sources = JSON.parse(await readFile(INPUT, "utf8"));

const results = [];
for (const source of sources.sources) {
  const started = Date.now();
  try {
    let response = await fetch(source.url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "user-agent": "The-Journey-Iraq/0.1 source-health-check" },
    });
    if ([403, 405].includes(response.status)) {
      response = await fetch(source.url, {
        method: "GET",
        redirect: "follow",
        headers: { "user-agent": "The-Journey-Iraq/0.1 source-health-check" },
      });
    }
    results.push({
      id: source.id,
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
      checkedAt: new Date().toISOString(),
      durationMs: Date.now() - started,
    });
  } catch (error) {
    results.push({
      id: source.id,
      ok: false,
      status: null,
      error: error instanceof Error ? error.message : String(error),
      checkedAt: new Date().toISOString(),
      durationMs: Date.now() - started,
    });
  }
}

await writeFile(
  OUTPUT,
  `${JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)}\n`,
  "utf8",
);

if (results.some((item) => !item.ok)) {
  console.warn("One or more official sources need review. See public/data/source-health.json");
}
