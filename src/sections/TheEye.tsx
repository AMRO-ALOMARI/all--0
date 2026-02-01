import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EyeLogo } from "../components/EyeLogo";
import type { SectionId } from "../App";

type Props = {
  onNavigate: (s: SectionId) => void;
};

export const TheEye: React.FC<Props> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // eye tracking
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let eyeX = 0;
    let eyeY = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (mouseX - centerX) / 20;
      const deltaY = (mouseY - centerY) / 20;
      eyeX += (deltaX - eyeX) * 0.1;
      eyeY += (deltaY - eyeY) * 0.1;
      wrapper.style.transform = `translate3d(${eyeX}px, ${eyeY}px, 0)`;
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMove);
    animate();
    return () => {
      document.removeEventListener("mousemove", handleMove);
    };
  }, []);
  
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <section className="fullscreen-center">
      <div
        ref={wrapperRef}
        style={{
          width: 320,
          height: 320,
          opacity: 0.18,
          mixBlendMode: "screen",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        <EyeLogo size={320} />
      </div>

      <div style={{ maxWidth: 700, textAlign: "center", position: "relative", zIndex: 5 }}>
        <h1
          style={{
            fontSize: "3rem",
            letterSpacing: "0.3em",
            marginBottom: "3rem",
            fontWeight: 200,
          }}
        >
          {t('the_eye_title')}
        </h1>
        <div
          dir={dir}
          style={{
            fontSize: "0.9rem",
            letterSpacing: "0.2em",
            lineHeight: 2.5,
            textAlign: dir === 'rtl' ? 'right' : 'left',
            paddingLeft: dir === 'ltr' ? "2rem" : undefined,
            paddingRight: dir === 'rtl' ? "2rem" : undefined,
            borderLeft: dir === 'ltr' ? "2px solid var(--dark-blood)" : undefined,
            borderRight: dir === 'rtl' ? "2px solid var(--dark-blood)" : undefined,
            fontFamily: i18n.language === 'ar' ? 'monospace' : 'inherit',
          }}
        >
          <p style={{ marginBottom: "1.5rem" }}>{t('eye_not_symbol')}</p>
          <p style={{ marginBottom: "1.5rem" }}>
            {t('awareness_without_permission')}
          </p>
          <p style={{ marginBottom: "1.5rem" }}>{t('does_not_sleep')}</p>
          <p style={{ marginBottom: "1.5rem" }}>{t('does_not_forget')}</p>
          <p style={{ marginBottom: "2rem" }}>{t('does_not_forgive')}</p>

          <p
            style={{
              textAlign: dir === 'rtl' ? 'left' : 'right',
              marginTop: "3rem",
              color: "var(--dark-blood)",
            }}
          >
            {t('you_dont_interact')}
            <br />
            <span style={{ color: "var(--ivory-silver)" }}>
              {t('you_are_processed')}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};


