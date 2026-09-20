"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Locale, Place } from "@/lib/content";

const IraqExplorerMap = dynamic(() => import("@/components/IraqExplorerMap"), {
  ssr: false,
  loading: () => <div className="map-loading">Loading Iraq map…</div>,
});

export default function LazyIraqExplorerMap({ locale, places }: { locale: Locale; places: Place[] }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready || !host.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(host.current);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div ref={host} className="lazy-map-host">
      {ready ? <IraqExplorerMap locale={locale} places={places} /> : <div className="map-loading">Map loads as you approach it…</div>}
    </div>
  );
}
