import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { SectionId } from "../App";

type Props = {
  onNavigate: (s: SectionId) => void;
};

export const TheManifesto: React.FC<Props> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const manifestoText = t("manifesto_text");

  useEffect(() => {
    // Reset typewriter on language change
    setDisplayedText("");
    setIsDeleting(false);
    setTypingSpeed(150);
  }, [i18n.language]);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = manifestoText;
      let updatedText = "";

      if (isDeleting) {
        updatedText = fullText.substring(0, displayedText.length - 1);
      } else {
        updatedText = fullText.substring(0, displayedText.length + 1);
      }

      setDisplayedText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        // Pause at end then start deleting
        setTimeout(() => setIsDeleting(true), 3000);
      } else if (isDeleting && updatedText === "") {
        // Finished deleting, loop
        setIsDeleting(false);
      }
    };

    const ticker = setInterval(handleTyping, typingSpeed);

    return () => clearInterval(ticker);
  }, [displayedText, isDeleting, typingSpeed, manifestoText]);

  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <section
      className="fullscreen-center"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: i18n.language === "ar" ? "monospace" : "'Courier New', monospace",
        textAlign: "center",
        padding: "50px",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <p
          dir={dir}
          style={{
            fontSize: "1.2rem",
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
            minHeight: "150px", // To prevent layout shifts
          }}
        >
          {displayedText}
          <span style={{ borderRight: "0.08em solid white", animation: "blink-caret .75s step-end infinite" }}></span>
        </p>
        <button
            onClick={() => onNavigate("eye")}
            style={{
                background: "transparent",
                border: "1px solid #fff",
                color: "#fff",
                padding: "10px 40px",
                fontFamily: "inherit",
                letterSpacing: "2px",
                cursor: "pointer",
                transition: "all 0.3s",
                marginTop: '50px'
            }}
        >
            {t("return")}
        </button>
      </div>
    </section>
  );
};
