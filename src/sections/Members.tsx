import React from "react";
import { useTranslation } from "react-i18next";
import type { SectionId } from "../App";
import { MemberCard } from "../components/MemberCard";
import { OrbitGraph } from "../components/OrbitGraph";
import { members, Member } from "../data/members";

type Props = {
  onNavigate: (s: SectionId) => void;
  activeMember: number | null;
  onActiveMemberChange: (id: number | null) => void;
  onOpenMember: (id: number) => void;
};

const membersData: Member[] = members;

export const Members: React.FC<Props> = ({
  onNavigate,
  activeMember,
  onActiveMemberChange,
  onOpenMember,
}) => {
  const { t } = useTranslation();
  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "4rem 2rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          letterSpacing: "0.3em",
          marginBottom: "4rem",
          textAlign: "center",
          fontWeight: 200,
        }}
      >
        {t("members_title")}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "3rem",
          marginTop: "3rem",
        }}
      >
        {membersData.map((m) => (
          <MemberCard
            key={m.id}
            member={m}
            onHover={onActiveMemberChange}
            onOpen={onOpenMember}
          />
        ))}
      </div>

      <OrbitGraph activeMember={activeMember} />

      {/* navigation zones */}
      <div
        style={{
          position: "fixed",
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


