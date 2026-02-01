import React from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: "en" | "ar") => {
    i18n.changeLanguage(lng);
  };

  const langButtonStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    color: "rgba(245,245,240,0.5)",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    margin: "0 0.5rem",
    padding: "0.5rem",
    textTransform: "uppercase",
  };

  const activeLangButtonStyle: React.CSSProperties = {
    ...langButtonStyle,
    color: "rgba(245,245,240,1)",
    textDecoration: "underline",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "2rem",
        right: "2rem",
        zIndex: 100,
      }}
    >
      <button
        onClick={() => changeLanguage("en")}
        style={i18n.language === "en" ? activeLangButtonStyle : langButtonStyle}
      >
        EN
      </button>
      <span style={{color: 'rgba(245,245,240,0.5)'}}>/</span>
      <button
        onClick={() => changeLanguage("ar")}
        style={i18n.language === "ar" ? activeLangButtonStyle : langButtonStyle}
      >
        AR
      </button>
    </div>
  );
};
