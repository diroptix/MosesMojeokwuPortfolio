import { useState, useEffect, useRef } from "react";

export function CursorBeam() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isTouch, setIsTouch] = useState(false);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    
    checkTouch();
    window.addEventListener("resize", checkTouch);

    function onMove(e: MouseEvent) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        setIsKeyboardMode(false);
      });
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Tab") {
        setIsKeyboardMode(true);
      }
    }

    if (!isTouch) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("keydown", onKeyDown);
      
      if (!isKeyboardMode) {
        document.body.style.cursor = "none";
      } else {
        document.body.style.cursor = "auto";
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", checkTouch);
      document.body.style.cursor = "auto";
    };
  }, [isTouch, isKeyboardMode]);

  if (isTouch || isKeyboardMode) return null;

  return (
    <div
      className="cursor-beam fixed pointer-events-none z-[9999] w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen transition-opacity duration-100"
      style={{
        left: pos.x + "px",
        top: pos.y + "px",
        background: "radial-gradient(circle, rgba(255,255,255,0.16), rgba(255,255,255,0.02))",
        backdropFilter: "blur(6px)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.8)",
      }}
      aria-hidden="true"
    />
  );
}
