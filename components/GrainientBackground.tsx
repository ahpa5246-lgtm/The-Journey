'use client';

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle, Vec2, Vec3 } from "ogl";

type GrainientBackgroundProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  grain?: number;
};

function hexToVec3(hex: string) {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean, 16);

  return new Vec3(
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  );
}

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uGrain;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.52;
    mat2 rotation = mat2(0.84, -0.54, 0.54, 0.84);

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = rotation * p * 2.02 + 17.13;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    float t = uTime * uSpeed;

    float warpA = fbm(p * 1.05 + vec2(t * 0.032, -t * 0.018));
    float warpB = fbm(p * 1.2 + vec2(4.7 - t * 0.021, 2.3 + t * 0.026));
    vec2 warped = p + 0.34 * vec2(warpA - 0.5, warpB - 0.5);

    float broad = fbm(warped * 0.82 + vec2(t * 0.012, -t * 0.017));
    float fine = fbm(warped * 1.48 - vec2(t * 0.018, t * 0.013));

    float greenField = smoothstep(0.18, 0.86, broad + uv.y * 0.18);
    float goldField = smoothstep(
      0.49,
      0.84,
      fine * 0.72 + broad * 0.28 + (1.0 - abs(uv.x - 0.68)) * 0.12
    );

    vec3 base = mix(uColor2, uColor1, greenField * 0.78);
    vec3 color = mix(base, uColor3, goldField * 0.58);

    float vignette = smoothstep(0.92, 0.22, length((uv - 0.5) * vec2(0.92, 1.05)));
    color *= mix(0.58, 1.0, vignette);

    float grain = hash(gl_FragCoord.xy + floor(uTime * 18.0) * 31.7) - 0.5;
    color += grain * uGrain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function GrainientBackground({
  color1 = "#31483B",
  color2 = "#050806",
  color3 = "#B79D4F",
  speed = 0.32,
  grain = 0.055,
}: GrainientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: false,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.6),
    });

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.className = "grainient-canvas";
    container.appendChild(canvas);

    const resolution = new Vec2(1, 1);
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uResolution: { value: resolution },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uGrain: { value: grain },
        uColor1: { value: hexToVec3(color1) },
        uColor2: { value: hexToVec3(color2) },
        uColor3: { value: hexToVec3(color3) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height);
      resolution.set(
        (gl.canvas as HTMLCanvasElement).width,
        (gl.canvas as HTMLCanvasElement).height,
      );
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const startedAt = performance.now();

    const render = (now: number) => {
      program.uniforms.uTime.value = (now - startedAt) / 1000;
      renderer.render({ scene: mesh });
      if (!reducedMotion && document.visibilityState === "visible") {
        frame = requestAnimationFrame(render);
      }
    };

    const onVisibilityChange = () => {
      cancelAnimationFrame(frame);
      if (document.visibilityState === "visible" && !reducedMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    renderer.render({ scene: mesh });
    if (!reducedMotion) frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resizeObserver.disconnect();
      canvas.remove();
    };
  }, [color1, color2, color3, speed, grain]);

  return (
    <div className="grainient-backdrop" aria-hidden="true">
      <div ref={containerRef} className="grainient-webgl" />
      <div className="grainient-veil" />
    </div>
  );
}
