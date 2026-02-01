import React from "react";
import { useTranslation } from "react-i18next";
import type { Member } from "../data/members";

type Props = {
  member: Member;
  onHover: (id: number | null) => void;
  onOpen: (id: number) => void;
};

export const MemberCard: React.FC<Props> = ({ member, onHover, onOpen }) => {
  const { t } = useTranslation();

  return (
    <div
      className="member-card"
      onClick={() => onOpen(member.id)}
      style={{
        borderTop: "1px solid rgba(245,245,240,0.2)",
        paddingTop: "2rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
      }}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="member-info">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", letterSpacing: "0.2em" }}>
            {t(`member_${member.id}_codeName`)}
          </h3>
          <span
            style={{
              width: 8,
              height: 8,
              background:
                member.status === "Active"
                  ? "var(--dark-blood)"
                  : "rgba(192,192,192,0.8)",
              borderRadius: "999px",
              marginTop: "0.5rem",
              display: "inline-block",
            }}
          />
        </div>
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
            opacity: 0.7,
          }}
        >
          {t('Function')}: {t(`member_${member.id}_functionLabel`)}
        </p>
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          {t('Status')}: {t(member.status === 'Active' ? 'status_active' : 'status_dormant')}
        </p>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            opacity: 0.6,
            fontFamily: "monospace",
          }}
        >
          {t('Last Signal')}: {member.lastSignal}
        </p>
      </div>
      <p
        className="hover-text"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "var(--dark-blood)",
          fontSize: "0.8rem",
          letterSpacing: "0.3em",
          opacity: 0,
          pointerEvents: "none",
          textAlign: 'center',
          width: '80%'
        }}
      >
        "{t(`member_${member.id}_mantra`)}"
      </p>
    </div>
  );
};


