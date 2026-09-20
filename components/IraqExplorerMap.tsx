"use client";

import { useMemo, useState } from "react";
import Map, { Layer, Popup, Source, type MapLayerMouseEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Locale, Place, PlaceCategory } from "@/lib/content";

const IRAQ_GEOJSON_URL = "/data/iraq-governorates.geojson";

const aliases: Record<string, string> = {
  Babil: "Babylon",
  Babylon: "Babylon",
  Arbil: "Erbil",
  Erbil: "Erbil",
  Ninawa: "Nineveh",
  Nineveh: "Nineveh",
  "Salah ad Din": "Salah al-Din",
  "Salah al-Din": "Salah al-Din",
};

const labels: Record<Locale, Record<"all" | PlaceCategory, string>> = {
  en: {
    all: "All",
    heritage: "Heritage",
    nature: "Nature",
    food: "Food",
    stay: "Stay",
    culture: "Culture",
  },
  ar: {
    all: "الكل",
    heritage: "آثار وتراث",
    nature: "طبيعة",
    food: "مطاعم",
    stay: "إقامة",
    culture: "ثقافة",
  },
};

export default function IraqExplorerMap({ locale, places }: { locale: Locale; places: Place[] }) {
  const [selectedGovernorate, setSelectedGovernorate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"all" | PlaceCategory>("all");
  const [popup, setPopup] = useState<{ lng: number; lat: number; name: string } | null>(null);

  const filtered = useMemo(() => {
    return places.filter((place) => {
      const governorateOk = !selectedGovernorate || place.governorate === selectedGovernorate;
      const categoryOk = selectedCategory === "all" || place.category === selectedCategory;
      return governorateOk && categoryOk;
    });
  }, [places, selectedGovernorate, selectedCategory]);

  function handleClick(event: MapLayerMouseEvent) {
    const feature = event.features?.[0];
    if (!feature) return;
    const rawName = String(feature.properties?.shapeName ?? feature.properties?.name ?? "");
    const name = aliases[rawName] ?? rawName;
    setSelectedGovernorate(name || null);
    setPopup({ lng: event.lngLat.lng, lat: event.lngLat.lat, name: name || rawName || "Iraq" });
  }

  const currentCount = selectedGovernorate
    ? places.filter((place) => place.governorate === selectedGovernorate).length
    : places.length;

  return (
    <div className="map-shell">
      <div className="map-canvas-wrap" aria-label={locale === "en" ? "Interactive map of Iraq" : "خريطة العراق التفاعلية"}>
        <Map
          initialViewState={{ longitude: 43.8, latitude: 33.2, zoom: 5.15 }}
          minZoom={4.6}
          maxZoom={12}
          mapStyle="https://tiles.openfreemap.org/styles/fiord"
          interactiveLayerIds={["iraq-fill"]}
          onClick={handleClick}
          cursor="pointer"
          attributionControl={{ compact: true }}
        >
          <Source id="iraq-governorates" type="geojson" data={IRAQ_GEOJSON_URL}>
            <Layer
              id="iraq-fill"
              type="fill"
              paint={{
                "fill-color": "#183a31",
                "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.82, 0.58],
              }}
            />
            <Layer
              id="iraq-outline"
              type="line"
              paint={{
                "line-color": "#d5c5a8",
                "line-opacity": 0.78,
                "line-width": 1.1,
              }}
            />
          </Source>
          {popup ? (
            <Popup
              longitude={popup.lng}
              latitude={popup.lat}
              closeButton={false}
              closeOnClick={false}
              offset={12}
              className="journey-popup"
            >
              <strong>{popup.name}</strong>
              <span>
                {locale === "en"
                  ? `${places.filter((place) => place.governorate === popup.name).length} verified places in the current catalogue`
                  : `${places.filter((place) => place.governorate === popup.name).length} أماكن موثقة في الكتالوج الحالي`}
              </span>
            </Popup>
          ) : null}
        </Map>
      </div>

      <aside className="map-panel">
        <div className="map-panel-heading">
          <p>{selectedGovernorate ?? (locale === "en" ? "All Iraq" : "كل العراق")}</p>
          <span>{currentCount}</span>
        </div>
        <div className="filter-row" role="group" aria-label={locale === "en" ? "Place category" : "تصنيف المكان"}>
          {(Object.keys(labels[locale]) as Array<"all" | PlaceCategory>).map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "filter-chip is-active" : "filter-chip"}
              onClick={() => setSelectedCategory(category)}
              type="button"
            >
              {labels[locale][category]}
            </button>
          ))}
        </div>
        <div className="map-results" aria-live="polite">
          {filtered.length ? (
            filtered.slice(0, 6).map((place) => (
              <a className="map-result" href={place.sourceUrl} target="_blank" rel="noreferrer" key={place.id}>
                <span>{place.name[locale]}</span>
                <small>{place.sourceLabel}</small>
              </a>
            ))
          ) : (
            <p className="empty-copy">
              {locale === "en"
                ? "No verified listing in this filter yet. Candidate data can be imported from OpenStreetMap, then reviewed before publishing."
                : "لا توجد نتيجة موثقة بهذا الفلتر حالياً. يمكن استيراد بيانات مرشحة من OpenStreetMap ثم مراجعتها قبل النشر."}
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
