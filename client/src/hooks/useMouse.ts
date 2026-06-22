import { useCallback, useEffect, useRef, useState } from "react";

export function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return mouse;
}

export function useMagneticRef(strength = 0.35) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  }, [strength]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove as EventListener);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove as EventListener);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleMove, handleLeave]);

  return ref;
}

export function useTiltRef() {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    el.style.transition = "transform 0.12s ease-out";
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove as EventListener);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove as EventListener);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleMove, handleLeave]);

  return ref;
}
