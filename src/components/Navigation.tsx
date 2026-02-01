import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionId } from '../App';

type NavigationProps = {
  onNavigate: (section: SectionId) => void;
  currentSection: SectionId;
};

const navItems: { id: SectionId; labelKey: string }[] = [
  { id: 'eye', labelKey: 'the_eye_title' },
  { id: 'collective', labelKey: 'the_collective_title' },
  { id: 'members', labelKey: 'members_title' },
  { id: 'leader', labelKey: 'leader_title' },
  { id: 'manifesto', labelKey: 'manifesto_title' },
  { id: 'access', labelKey: 'access_title' },
];

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentSection }) => {
  const { t } = useTranslation();

  return (
    <nav style={{ position: 'fixed', top: '2rem', width: '100%', textAlign: 'center', zIndex: 10 }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'inline-flex', gap: '2rem' }}>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: currentSection === item.id ? 'var(--dark-blood)' : 'rgba(245,245,240,0.7)',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontSize: '0.8rem',
                fontWeight: currentSection === item.id ? 'bold' : 'normal',
                transition: 'color 0.3s',
              }}
            >
              {t(item.labelKey)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
