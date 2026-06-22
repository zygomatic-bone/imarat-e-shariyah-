import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export default function MeshGradient({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useApp();
  const animRef = useRef<number>(0);
  const blobsRef = useRef<Blob[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const lightColors = [
      "rgba(212,175,55,0.18)",
      "rgba(243,210,139,0.14)",
      "rgba(212,175,55,0.10)",
      "rgba(255,220,100,0.09)",
      "rgba(200,160,40,0.08)",
    ];
    const darkColors = [
      "rgba(212,175,55,0.22)",
      "rgba(180,140,30,0.16)",
      "rgba(243,210,139,0.12)",
      "rgba(100,80,10,0.25)",
      "rgba(212,175,55,0.08)",
    ];

    const colors = theme === "dark" ? darkColors : lightColors;

    blobsRef.current = colors.map((color) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 200 + Math.random() * 300,
      color,
      opacity: 0.6 + Math.random() * 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const blob of blobsRef.current) {
        blob.x += blob.vx;
        blob.y += blob.vy;
        if (blob.x < -blob.size) blob.x = canvas.width + blob.size;
        if (blob.x > canvas.width + blob.size) blob.x = -blob.size;
        if (blob.y < -blob.size) blob.y = canvas.height + blob.size;
        if (blob.y > canvas.height + blob.size) blob.y = -blob.size;

        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.size);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
