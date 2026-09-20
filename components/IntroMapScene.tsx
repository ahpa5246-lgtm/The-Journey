"use client";

import { useMemo, useState } from "react";
import Map, { Layer, Source, type MapLayerMouseEvent } from "react-map-gl/maplibre";
import { MapPinned } from "lucide-react";
import type { Locale, Place } from "@/lib/content";

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

type HoverInfo = {
  rawName: string;
  name: string;
  x: number;
  y: number;
};

const introStyle = {
  version: 8 as const,
  sources: {},
  layers: [
    {
      id: "night",
      type: "background" as const,
      paint: { "background-color": "#050605" },
    },
  ],
};

export default function IntroMapScene({ locale, places }: { locale: Locale; places: Place[] }) {
  const [hover, setHover] = useState<HoverInfo | null>(null);

  const counts = useMemo(() => {
    return places.reduce<Record<string, number>>((acc, place) => {
      acc[place.governorate] = (acc[place.governorate] ?? 0) + 1;
      return acc;
    }, {});
  }, [places]);

  function onMove(event: MapLayerMouseEvent) {
    const feature = event.features?.[0];
    if (!feature) {
      setHover(null);
      return;
    }
    const rawName = String(feature.properties?.shapeName ?? feature.properties?.name ?? "");
    const name = aliases[rawName] ?? rawName;
    setHover({ rawName, name, x: event.point.x, y: event.point.y });
  }

  const emptyFilter = ["==", ["get", "shapeName"], "__none__"] as const;
  const hoverFilter = hover
    ? (["==", ["get", "shapeName"], hover.rawName] as const)
    : emptyFilter;

  return (
    <div className="intro-map-experience">
      <div className="intro-map-copy">
        <span>{locale === "ar" ? "حرّك المؤشر فوق العراق" : "Move across Iraq"}</span>
        <strong>{locale === "ar" ? "كل محافظة تبدأ قصة مختلفة." : "Every governorate opens a different story."}</strong>
      </div>

      <Map
        initialViewState={{ longitude: 43.72, latitude: 33.05, zoom: 5.12 }}
        mapStyle={introStyle}
        interactiveLayerIds={["intro-iraq-fill"]}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        scrollZoom={false}
        dragPan={false}
        dragRotate={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
        keyboard={false}
        attributionControl={false}
        cursor={hover ? "none" : "crosshair"}
      >
        <Source id="intro-iraq" type="geojson" data="/data/iraq-governorates.geojson">
          <Layer
            id="intro-iraq-fill"
            type="fill"
            paint={{
              "fill-color": "#102b23",
              "fill-opacity": 0.96,
            }}
          />
          <Layer
            id="intro-iraq-borders"
            type="line"
            paint={{
              "line-color": "rgba(214,196,163,.32)",
              "line-width": 0.9,
            }}
          />
          <Layer
            id="intro-iraq-hover"
            type="fill"
            filter={hoverFilter as never}
            paint={{
              "fill-color": "#1a4538",
              "fill-opacity": 1,
            }}
          />
          <Layer
            id="intro-iraq-hover-outline"
            type="line"
            filter={hoverFilter as never}
            paint={{
              "line-color": "#d6c4a3",
              "line-width": 2,
            }}
          />
        </Source>
      </Map>

      {hover ? (
        <div
          className="intro-map-hover"
          style={{ left: `min(calc(100% - 250px), ${hover.x + 18}px)`, top: `${Math.max(90, hover.y - 10)}px` }}
          aria-live="polite"
        >
          <span className="intro-pin"><MapPinned size={18} /></span>
          <div>
            <strong>{hover.name}</strong>
            <span>
              {locale === "ar"
                ? `${counts[hover.name] ?? 0} أماكن موثقة حالياً`
                : `${counts[hover.name] ?? 0} verified places so far`}
            </span>
          </div>
        </div>
      ) : null}

      <div className="intro-map-footnote">
        {locale === "ar"
          ? "الرقم يعني ما تم توثيقه داخل الرحلة، وليس إجمالي الأماكن الموجودة في المحافظة."
          : "Counts reflect the reviewed Journey catalogue — not a claim about every place that exists."}
      </div>
    </div>
  );
}
