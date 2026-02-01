import React from "react";
import { useTranslation } from "react-i18next";
import type { SectionId } from "../App";

type Props = {
  onNavigate: (s: SectionId) => void;
};

export const TheCollective: React.FC<Props> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <section className="fullscreen-center">
      <div style={{ maxWidth: 800, textAlign: "center" }}>
        <div
          style={{
            fontSize: "1.1rem",
            letterSpacing: "0.25em",
            lineHeight: 2.5,
            marginBottom: "4rem",
          }}
        >
          <p style={{ marginBottom: "3rem" }}>
            <span style={{ fontWeight: 500 }}>ALLSITEY</span> {t("allsitey_is_closed")}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "4rem 0",
              padding: "2rem 0",
              borderTop: "1px solid rgba(245,245,240,0.2)",
              borderBottom: "1px solid rgba(245,245,240,0.2)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "4rem",
                  fontWeight: 200,
                  color: "var(--dark-blood)",
                  lineHeight: 1,
                }}
              >
                10
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  marginTop: "0.5rem",
                  opacity: 0.7,
                }}
              >
                {t("entities_execute")}
              </div>
            </div>
            <div
              style={{
                width: 1,
                height: 80,
                background: "rgba(245,245,240,0.2)",
              }}
            />
            <div>
              <div
                style={{
                  fontSize: "4rem",
                  fontWeight: 200,
                  lineHeight: 1,
                }}
              >
                01
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  marginTop: "0.5rem",
                  opacity: 0.7,
                }}
              >
                {t("entity_decides")}
              </div>
            </div>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <p
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                marginBottom: "1rem",
                opacity: 0.8,
              }}
            >
              {t("no_democracy")}
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                marginBottom: "1rem",
                opacity: 0.8,
              }}
            >
              {t("no_consensus")}
            </p>
            <p
              style={{
                fontSize: "1rem",
                letterSpacing: "0.3em",
                marginTop: "2rem",
                color: "var(--dark-blood)",
                fontWeight: 400,
              }}
            >
              {t("only_alignment")}
            </p>
          </div>

          <button
            onClick={() => onNavigate("manifesto")}
            style={{
                background: "transparent",
                border: "none",
                color: "rgba(245,245,240,0.7)",
                padding: "10px 40px",
                fontFamily: "inherit",
                letterSpacing: "0.3em",
                cursor: "pointer",
                transition: "all 0.3s",
                marginTop: '4rem',
                fontSize: '0.7rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--dark-blood)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'rgba(245,245,240,0.7)'}
            >
            {t("read_the_doctrine")}
          </button>

        </div>
      </div>

      {/* subtle navigation */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <div
          onClick={() => onNavigate("eye")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "20%",
            height: "100%",
            pointerEvents: "auto",
          }}
        />
        <div
          onClick={() => onNavigate("members")}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "30%",
            height: "20%",
            pointerEvents: "auto",
          }}
        />
        <div
          onClick={() => onNavigate("leader")}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "30%",
            height: "20%",
            pointerEvents: "auto",
          }}
        />
      </div>
    </section>
  );
};


