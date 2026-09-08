"use client";

import { useEffect, useRef, useState } from "react";
import Star from "./Star";
import type { StarScene } from "./star-scene";
import styles from "./StarSculpture.module.css";

export default function StarSculpture() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<StarScene | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = root.current!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let failed = false;
    let loading = false;
    let visible =
      element.getBoundingClientRect().bottom > 0 &&
      element.getBoundingClientRect().top < window.innerHeight;
    let generation = 0;
    let timer: number | undefined;

    const fail = () => {
      if (disposed) return;
      failed = true;
      scene.current?.dispose();
      scene.current = null;
      setReady(false);
    };
    const sync = () => {
      const canRender = visible && !document.hidden && !motion.matches;
      scene.current?.setVisible(canRender);
      if (motion.matches) {
        generation++;
        if (timer !== undefined) loading = false;
        window.clearTimeout(timer);
        timer = undefined;
        if (scene.current) {
          scene.current.dispose();
          scene.current = null;
          setReady(false);
        }
        return;
      }
      if (!canRender && timer !== undefined) {
        window.clearTimeout(timer);
        timer = undefined;
        loading = false;
      }
      if (!canRender || loading || failed || scene.current) return;
      loading = true;
      const version = ++generation;
      timer = window.setTimeout(async () => {
        timer = undefined;
        let surface: HTMLCanvasElement | undefined;
        let retained = false;
        try {
          const { createStarScene } = await import("./star-scene");
          if (disposed || version !== generation || motion.matches) return;
          // Disposing a renderer loses its context; each scene needs a fresh canvas.
          surface = document.createElement("canvas");
          surface.className = styles.canvas;
          surface.setAttribute("aria-hidden", "true");
          stage.current!.append(surface);
          const created = await createStarScene(surface, () => {
            if (!disposed && version === generation) fail();
          });
          if (disposed || version !== generation || motion.matches) {
            created.dispose();
            return;
          }
          const activeSurface = surface;
          scene.current = {
            ...created,
            dispose() {
              created.dispose();
              activeSurface.remove();
            },
          };
          retained = true;
          created.setVisible(visible && !document.hidden);
          setReady(true);
        } catch {
          if (!disposed && version === generation) fail();
        } finally {
          if (!retained) surface?.remove();
          loading = false;
          if (!disposed && !scene.current && !failed && !motion.matches) sync();
        }
      }, 350);
    };

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            sync();
          })
        : null;
    const resize =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => scene.current?.resize())
        : null;
    observer?.observe(element);
    resize?.observe(element);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      disposed = true;
      generation++;
      window.clearTimeout(timer);
      observer?.disconnect();
      resize?.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  return (
    <div ref={root} className={styles.sculpture} data-ready={ready}>
      <div ref={stage} className={styles.stage}>
        <Star className={styles.fallback} />
      </div>
      {ready && (
        <button
          type="button"
          className={styles.control}
          aria-label="Turn the star"
          onClick={() => scene.current?.turn()}
          onPointerMove={(event) => {
            if (event.pointerType === "touch") return;
            const rect = event.currentTarget.getBoundingClientRect();
            scene.current?.aim(
              ((event.clientX - rect.left) / rect.width) * 2 - 1,
              ((event.clientY - rect.top) / rect.height) * 2 - 1,
            );
          }}
          onPointerLeave={() => scene.current?.aim(0, 0)}
          onBlur={() => scene.current?.aim(0, 0)}
        >
          <span>
            Give it a turn <span aria-hidden="true">↻</span>
          </span>
        </button>
      )}
    </div>
  );
}
