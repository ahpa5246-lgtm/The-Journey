'use client';

import { useEffect, useRef } from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;

  vec3 field = vec3(
    cos(uv * vec2(d, a)) * 0.6 + 0.4,
    cos(a + d) * 0.5 + 0.5
  );

  field = clamp(
    cos(field * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * 0.5 + 0.5,
    0.0,
    1.0
  );

  // The Journey palette: Night, Marsh, Deep Green, Desert Sand.
  vec3 night = vec3(0.020, 0.031, 0.024);     // #050806
  vec3 marsh = vec3(0.094, 0.188, 0.153);     // #183027
  vec3 deepGreen = vec3(0.192, 0.282, 0.231); // #31483B
  vec3 sand = vec3(0.847, 0.788, 0.647);      // #D8C9A5

  float energy = dot(field, vec3(0.30, 0.50, 0.20));
  float greenFlow = smoothstep(0.24, 0.88, field.g);
  float warmHighlight = smoothstep(
    0.66,
    0.98,
    field.r * 0.48 + field.g * 0.34 + field.b * 0.18
  );

  vec3 col = mix(night, marsh, smoothstep(0.08, 0.72, energy));
  col = mix(col, deepGreen, greenFlow * 0.72);
  col = mix(col, sand, warmHighlight * 0.20);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function GrainientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: false,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    });

    const gl = renderer.gl;
    gl.clearColor(0.02, 0.03, 0.025, 1);

    const geometry = new Triangle(gl);
    const mouse = new Float32Array([0.5, 0.5]);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / Math.max(gl.canvas.height, 1),
          ),
        },
        uMouse: { value: mouse },
        uAmplitude: { value: 0.1 },
        // Slightly calmer than the React Bits demo while preserving its motion.
        uSpeed: { value: 0.9 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.className = "grainient-iridescence-canvas";
    container.appendChild(canvas);

    const resize = () => {
      const width = Math.max(container.offsetWidth, 1);
      const height = Math.max(container.offsetHeight, 1);
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / Math.max(gl.canvas.height, 1),
      );
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;

      program.uniforms.uMouse.value[0] = x;
      program.uniforms.uMouse.value[1] = y;
    };

    resize();
    window.addEventListener("resize", resize, false);
    container.addEventListener("mousemove", handleMouseMove);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;

    const update = (time: number) => {
      program.uniforms.uTime.value = reducedMotion ? 0 : time * 0.001;
      renderer.render({ scene: mesh });

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className="grainient-backdrop" aria-hidden="true">
      <div ref={containerRef} className="grainient-iridescence" />
      <div className="grainient-veil" />
    </div>
  );
}
