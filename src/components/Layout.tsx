import React, { ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SectionId } from "../App";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Navigation } from "./Navigation"; // Import Navigation

type LayoutProps = {
  section: SectionId;
  onNavigate: (s: SectionId) => void;
  activeMember: number | null;
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  section,
  onNavigate,
}) => {
  const { t } = useTranslation();
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const loop = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", handleMove);
    loop();

    return () => {
      document.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      <LanguageSwitcher />
      <Navigation onNavigate={onNavigate} currentSection={section} />
      {/* background glow */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(250,250,250,0.04) 0, transparent 55%), radial-gradient(circle at 80% 100%, rgba(250,250,250,0.04) 0, transparent 55%)",
          mixBlendMode: "screen",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 0,
          animation: "backgroundDrift 40s linear infinite alternate",
        }}
      />
      {/* vignette */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.9) 95%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* scanlines */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "100% 4px",
          opacity: 0.15,
          mixBlendMode: "soft-light",
          zIndex: 2,
        }}
      />

      {/* custom cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 26,
          height: 26,
          borderRadius: "999px",
          border: "1px solid rgba(245,245,240,0.4)",
          pointerEvents: "none",
          zIndex: 50,
          transform: "translate3d(-100px, -100px, 0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: "screen",
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "999px",
            backgroundColor: "var(--dark-blood)",
          }}
        />
      </div>

      <main style={{ position: "relative", zIndex: 5 }}>{children}</main>

      <footer
        style={{
          position: "fixed",
          bottom: "2rem",
          width: "100%",
          textAlign: "center",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(245,245,240,0.5)",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div>{t("footer_text")}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
          <a href="https://www.tiktok.com/@allsitey" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,245,240,0.5)", textDecoration: "none" }}>TIKTOK</a>
          <a href="https://www.instagram.com/@allsitey" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,245,240,0.5)", textDecoration: "none" }}>INSTAGRAM</a>
          <a href="https://twitter.com/@allsitey" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,245,240,0.5)", textDecoration: "none" }}>X</a>
        </div>
      </footer>
    </div>
  );
};


