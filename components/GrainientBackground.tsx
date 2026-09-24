'use client';

import { useEffect } from "react";
// @ts-expect-error gradient-gl 2.0.5 does not ship TypeScript declarations.
import gradientGL from "gradient-gl";

// Keep the b3 shader and its original "a" speed. The remaining seed values
// tune hue, saturation and lightness toward The Journey's muted green/sand mood.
const JOURNEY_GRADIENT_SEED = "b3.ab55";

export default function GrainientBackground() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    gradientGL(JOURNEY_GRADIENT_SEED, "#journey-gradient")
      .then(() => {
        if (cancelled) return;

        const canvas = document.querySelector<HTMLCanvasElement>(
          "#journey-gradient > #gradient-gl",
        );

        if (!canvas) return;

        // gradient-gl intentionally creates its canvas with an inline
        // z-index:-1!important. Inside our fixed backdrop that places the
        // animation behind the backdrop's own dark paint. Override those
        // inline values after initialization so the gradient is actually visible.
        canvas.style.setProperty("position", "absolute", "important");
        canvas.style.setProperty("inset", "0", "important");
        canvas.style.setProperty("width", "100%", "important");
        canvas.style.setProperty("height", "100%", "important");
        canvas.style.setProperty("z-index", "0", "important");
        canvas.style.setProperty("opacity", "1", "important");
      })
      .catch((error: unknown) => {
        console.error("Unable to initialize gradient background", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="grainient-backdrop" aria-hidden="true">
      <div id="journey-gradient" className="grainient-webgl" />
      <div className="grainient-veil" />
    </div>
  );
}
