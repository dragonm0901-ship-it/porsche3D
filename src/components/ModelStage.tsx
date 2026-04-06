"use client";

import Image from "next/image";
import { createElement, useEffect, useRef, useState } from "react";
import type { FeaturedSlide } from "@/content/site";

type ModelStageProps = {
  slide: FeaturedSlide;
  priority?: boolean;
  variant?: "hero" | "collection" | "garage";
  hoverRotation?: boolean;
  /** Scroll-driven rotation offset for hero (degrees, 0 = default side view) */
  scrollRotation?: number;
};

export function ModelStage({
  slide,
  priority = false,
  variant = "hero",
  hoverRotation = false,
  scrollRotation = 0,
}: ModelStageProps) {
  const [viewerReady, setViewerReady] = useState(false);
  const [hasModelError, setHasModelError] = useState(false);
  const shouldUseModel = Boolean(slide.modelPath);
  const viewerRef = useRef<any>(null);
  const className = `model-viewer model-viewer-${variant}`;
  const imageClassName = `stage-image stage-image-${variant}`;

  const imageSize =
    variant === "garage"
      ? { width: 980, height: 560 }
      : variant === "collection"
        ? { width: 760, height: 400 }
        : { width: 1600, height: 800 };

  useEffect(() => {
    setHasModelError(false);
  }, [slide.modelPath]);

  useEffect(() => {
    if (!shouldUseModel) return;
    let mounted = true;
    void import("@google/model-viewer").then(() => {
      if (mounted) setViewerReady(true);
    });
    return () => { mounted = false; };
  }, [shouldUseModel]);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el || !shouldUseModel || !viewerReady) return;
    const handleError = () => setHasModelError(true);
    const handleLoad = () => setHasModelError(false);
    el.addEventListener("error", handleError);
    el.addEventListener("load", handleLoad);
    return () => {
      el.removeEventListener("error", handleError);
      el.removeEventListener("load", handleLoad);
    };
  }, [shouldUseModel, viewerReady, slide.modelPath]);

  // Scroll-driven rotation for hero variant
  useEffect(() => {
    const el = viewerRef.current;
    if (!el || !viewerReady || variant !== "hero") return;
    // Base: 270deg = completely side-facing profile.
    const orbit = `${270 + scrollRotation}deg 72deg 55%`;
    el.cameraOrbit = orbit;
  }, [scrollRotation, viewerReady, variant]);

  // Hover rotation for collection variant
  useEffect(() => {
    const el = viewerRef.current;
    if (!el || !viewerReady || variant !== "collection") return;
    el.cameraOrbit = hoverRotation ? "280deg 72deg 105%" : "250deg 75deg auto";
  }, [hoverRotation, viewerReady, variant]);

  if (shouldUseModel && !hasModelError) {
    const props: Record<string, unknown> = {
      src: slide.modelPath ?? undefined,
      "interpolation-decay": "200",
      "touch-action": "pan-y",
      "shadow-intensity": "1.6",
      "shadow-softness": "0.7",
      exposure: "1.15",
      "environment-image": "neutral",
      "interaction-prompt": "none",
      "interaction-prompt-style": "basic",
      ref: viewerRef,
      className,
    };

    if (variant === "hero") {
      props["disable-zoom"] = "";
      props["camera-orbit"] = "270deg 72deg 55%";
      props["min-camera-orbit"] = "auto auto auto";
      props["max-camera-orbit"] = "auto auto auto";
      props["field-of-view"] = "16deg";
    } else if (variant === "garage") {
      props["camera-controls"] = "";
      props["disable-pan"] = "";
      props["camera-orbit"] = "250deg 72deg 105%";
      props["min-camera-orbit"] = "auto 30deg auto";
      props["max-camera-orbit"] = "auto 88deg auto";
      props["min-field-of-view"] = "14deg";
      props["max-field-of-view"] = "32deg";
      props["field-of-view"] = "24deg";
      props["ar"] = "";
      props["ar-modes"] = "webxr scene-viewer quick-look";
    } else {
      props["disable-zoom"] = "";
      props["camera-orbit"] = "250deg 75deg auto";
      props["field-of-view"] = "26deg";
    }

    // We render the web-component directly; the browser will upgrade it once the dynamic import finishes.
    return createElement("model-viewer", props);
  }

  // Only show the fallback image if there is no model or if the model errored out
  return (
    <Image
      src={slide.imagePath}
      alt={slide.alt}
      width={imageSize.width}
      height={imageSize.height}
      priority={priority}
      className={imageClassName}
    />
  );
}
