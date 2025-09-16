
import React from 'react';
import type { ActiveSection } from '../types';
import { UserIcon, AcademicCapIcon, BriefcaseIcon, SparklesIcon, DocumentTextIcon, PaintBrushIcon } from './icons';

interface SidebarProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

const navItems = [
  { id: 'personalInfo', label: 'Personal Info', icon: UserIcon },
  { id: 'experience', label: 'Experience', icon: BriefcaseIcon },
  { id: 'education', label: 'Education', icon: AcademicCapIcon },
  { id: 'skills', label: 'Skills', icon: SparklesIcon },
  { id: 'extras', label: 'Extras', icon: DocumentTextIcon },
  { id: 'separator', label: 'AI Tools', isSeparator: true },
  { id: 'ai-suggestions', label: 'AI Suggestions', icon: SparklesIcon },
  { id: 'job-matcher', label: 'Job Matcher', icon: BriefcaseIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="w-64 bg-white/20 backdrop-blur-md p-4 flex-shrink-0 overflow-y-auto">
      <nav>
        <ul>
          {navItems.map((item) => {
            if (item.isSeparator) {
              return <li key={item.id} className="mt-6 mb-2 px-2 text-sm font-semibold uppercase text-[#6d5b59]">{item.label}</li>;
            }
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id as ActiveSection)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-[#a0522d] to-[#8c4b2a] text-white shadow'
                      : 'text-[#4a3735] hover:bg-black/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
