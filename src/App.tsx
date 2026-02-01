import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { LandingRitual } from "./sections/LandingRitual";
import { TheEye } from "./sections/TheEye";
import { TheCollective } from "./sections/TheCollective";
import { Members } from "./sections/Members";
import { Leader } from "./sections/Leader";
import { Access } from "./sections/Access";
import { MemberDetail } from "./components/MemberDetail";
import { TheManifesto } from "./sections/TheManifesto";

export type SectionId =
  | "landing"
  | "eye"
  | "collective"
  | "members"
  | "leader"
  | "access"
  | "manifesto";

export const App: React.FC = () => {
  const [section, setSection] = useState<SectionId>("landing");
  const [activeMember, setActiveMember] = useState<number | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const navigate = useCallback((target: SectionId) => {
    setSection(target);
    if (target !== "members") {
      setSelectedMemberId(null);
    }
    if (typeof window !== "undefined") {
      const hash = target === "landing" ? "" : `#${target}`;
      window.location.hash = hash;
    }
  }, []);

  // sync with hash on load / change
  useEffect(() => {
    const applyFromHash = () => {
      if (typeof window === "undefined") return;
      const raw = window.location.hash.slice(1);
      if (!raw) {
        setSection("landing");
        return;
      }
      if (raw.startsWith("entity-")) {
        const id = parseInt(raw.replace("entity-", ""), 10);
        if (!Number.isNaN(id)) {
          setSection("members");
          setSelectedMemberId(id);
          setActiveMember(id);
        }
        return;
      }
      const asSection = raw as SectionId;
      setSection(asSection);
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  return (
    <Layout section={section} onNavigate={navigate} activeMember={activeMember}>
      {section === "landing" && <LandingRitual onEnter={() => navigate("eye")} />}
      {section === "eye" && <TheEye onNavigate={navigate} />}
      {section === "collective" && <TheCollective onNavigate={navigate} />}
      {section === "members" && (
        <Members
          onNavigate={navigate}
          activeMember={activeMember}
          onActiveMemberChange={setActiveMember}
          onOpenMember={(id) => {
            setSelectedMemberId(id);
            setActiveMember(id);
            if (typeof window !== "undefined") {
              window.location.hash = `#entity-${id.toString().padStart(2, "0")}`;
            }
          }}
        />
      )}
      {section === "leader" && (
        <Leader onNavigate={navigate} activeMember={activeMember} />
      )}
      {section === "access" && <Access onNavigate={navigate} />}
      {section === "manifesto" && <TheManifesto onNavigate={navigate} />}

      {selectedMemberId && (
        <MemberDetail
          memberId={selectedMemberId}
          onClose={() => {
            setSelectedMemberId(null);
            if (typeof window !== "undefined") {
              window.location.hash = "#members";
            }
          }}
          onNavigate={navigate}
          onSetMember={(id) => {
            setSelectedMemberId(id);
            setActiveMember(id);
            if (typeof window !== "undefined") {
              window.location.hash = `#entity-${id.toString().padStart(2, "0")}`;
            }
          }}
        />
      )}
    </Layout>
  );
};


