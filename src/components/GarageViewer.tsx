"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useState } from "react";
import type { FeaturedSlide } from "@/content/site";
import { ModelStage } from "@/components/ModelStage";

type GarageViewerProps = {
  slide: FeaturedSlide;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function GarageViewer({ slide }: GarageViewerProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const usesModel = Boolean(slide.modelPath);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;

    setTilt({
      x: clamp((0.5 - offsetY) * 10, -9, 9),
      y: clamp((offsetX - 0.5) * 24, -18, 18),
    });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
    setDragging(false);
  };

  const style = {
    "--garage-top": slide.accent.top,
    "--garage-haze": slide.accent.haze,
    "--garage-glow": slide.accent.glow,
    "--garage-tilt-x": `${tilt.x}deg`,
    "--garage-tilt-y": `${tilt.y}deg`,
  } as CSSProperties;

  return (
    <div
      className="garage-scene"
      style={style}
      data-lenis-prevent="true"
      onPointerDown={() => setDragging(true)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={resetTilt}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="garage-light" />
      <div className="garage-floor-glow" />
      <div className={`garage-vehicle ${usesModel ? "is-model" : "is-tiltable"}`}>
        <ModelStage slide={slide} variant="garage" />
      </div>
    </div>
  );
}
