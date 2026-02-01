import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SectionId } from "../App";

type Props = {
  onNavigate: (s: SectionId) => void;
};

export const Access: React.FC<Props> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const buttonStyle: React.CSSProperties = {
    background: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    padding: "10px 40px",
    fontFamily: "inherit",
    letterSpacing: "2px",
    cursor: "pointer",
    transition: "all 0.3s",
    ...(isHovering && { background: "#fff", color: "#000" }),
  };

  const terminalMessage = [
    t("signal_received"),
    t("id_logged"),
    t("under_observation"),
    t("await_instructions"),
  ].join("\n");
  
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <section
      className="fullscreen-center"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: i18n.language === 'ar' ? "monospace" : "'Courier New', monospace",
        textAlign: "center",
        borderTop: "1px solid #333",
        padding: "50px",
      }}
    >
      <h2
        style={{
          fontWeight: "normal",
          letterSpacing: "5px",
          fontSize: "14px",
          marginBottom: "40px",
          color: "#888",
        }}
      >
        {t("system_access")}
      </h2>

      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          border: "1px solid #222",
          padding: "40px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-1px",
            left: "-1px",
            width: "10px",
            height: "10px",
            borderTop: "2px solid #fff",
            borderLeft: "2px solid #fff",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-1px",
            right: "-1px",
            width: "10px",
            height: "10px",
            borderBottom: "2px solid #fff",
            borderRight: "2px solid #fff",
          }}
        />

        {isSubmitted ? (
          <div style={{ minHeight: "220px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p dir={dir} style={{ color: "#0f0", whiteSpace: "pre-wrap", fontSize: "12px", lineHeight: 1.8, fontFamily: "monospace" }}>
              {terminalMessage}
            </p>
          </div>
        ) : (
          <>
            <p
              dir={dir}
              style={{
                marginBottom: "30px",
                fontSize: "12px",
                color: "#aaa",
                lineHeight: 1.6,
              }}
            >
              {t("os_beta")}
              <br />
              {t("compiler_compiling")}
              <br />
              {t("receive_signal")}
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder={t("email_placeholder")}
                required
                disabled={isSubmitting}
                dir={dir}
                style={{
                  width: "100%",
                  background: "#050505",
                  border: "1px solid #333",
                  color: "#fff",
                  padding: "15px",
                  fontFamily: "inherit",
                  marginBottom: "20px",
                  outline: "none",
                  letterSpacing: "1px",
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              />

              <button
                type="submit"
                style={buttonStyle}
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
                disabled={isSubmitting}
              >
                {isSubmitting ? t("transmitting") : t("transmit")}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};


