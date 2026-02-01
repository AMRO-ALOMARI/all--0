import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EyeLogo } from "../components/EyeLogo";

type Props = {
  onEnter: () => void;
};

export const LandingRitual: React.FC<Props> = ({ onEnter }) => {
  const { t, i18n } = useTranslation();
  const textRef = useRef<HTMLDivElement | null>(null);

  const text = [
    t("not_by_accident"),
    "",
    t("we_do_not_recruit"),
    t("we_observe"),
    "",
    t("eye_knows_you"),
  ].join("\n");

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let i = 0;
    el.innerHTML = "";

    const type = () => {
      if (!el) return;
      if (i < text.length) {
        const safe = text.substring(0, i + 1).replace(/\n/g, "<br/>");
        el.innerHTML = safe + '<span class="cursor-blink">|</span>';
        i++;
        const randomDelay = 30 + Math.random() * 40;
        setTimeout(type, randomDelay);
      } else {
        el.innerHTML = text.replace(/\n/g, "<br/>") + '<span class="cursor-blink">|</span>';
      }
    };

    const id = setTimeout(type, 800);
    return () => clearTimeout(id);
  }, [text]);

  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <section className="fullscreen-center">
      <div className="logo-container fade-in" style={{ animationDelay: "1s", opacity: 0 }}>
        <EyeLogo size={200} />
        <div className="logo-text" style={{ marginTop: "1.5rem" }}>
          ALLSITEY
        </div>
      </div>

      <div
        className="fade-in"
        style={{
          maxWidth: 600,
          marginTop: "3rem",
          textAlign: "center",
          animationDelay: "2s",
          opacity: 0,
        }}
      >
        <div
          ref={textRef}
          dir={dir}
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.18em",
            lineHeight: 2,
            minHeight: "5rem",
            fontFamily: i18n.language === 'ar' ? 'monospace' : 'inherit',
          }}
        />
      </div>

      <div
        className="fade-in"
        style={{ marginTop: "4rem", animationDelay: "4.5s", opacity: 0 }}
      >
        <button className="btn-primary" onClick={onEnter}>
          {t("enter_under_observation")}
        </button>
      </div>
    </section>
  );
};


