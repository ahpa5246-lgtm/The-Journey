'use client';

import { useEffect } from "react";
// @ts-expect-error gradient-gl 2.0.5 does not ship TypeScript declarations.
import gradientGL from "gradient-gl";

// Keep the b3 shader and speed "a"; only the H/S/L seed values are adapted
// to The Journey's muted night, marsh-green and sand identity.
const JOURNEY_GRADIENT_SEED = "b3.ab55";

export default function GrainientBackground() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gradientGL(JOURNEY_GRADIENT_SEED, "#journey-gradient").catch((error: unknown) => {
      console.error("Unable to initialize gradient background", error);
    });
  }, []);

  return (
    <div className="grainient-backdrop" aria-hidden="true">
      <div id="journey-gradient" className="grainient-webgl" />
      <div className="grainient-veil" />
    </div>
  );
}
