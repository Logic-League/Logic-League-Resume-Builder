import React, { forwardRef, useMemo } from 'react';
import { TEMPLATES } from '../constants';
import type { ResumeData, TemplateKey, ExtraEntry } from '../types';
import { EnvelopeIcon, PhoneIcon, LinkIcon, GlobeAltIcon, AcademicCapIcon, BriefcaseIcon, SparklesIcon, DocumentTextIcon, UserIcon } from './icons';

interface ResumePreviewProps {
  resumeData: ResumeData;
  activeTemplate: TemplateKey;
  setActiveTemplate: (template: TemplateKey) => void;
}

const SkillLevelIndicator: React.FC<{ level?: number }> = ({ level = 4 }) => (
    <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < level ? 'bg-[#9d6f56]' : 'bg-gray-300'}`}></div>
        ))}
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mt-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#8c4b2a] to-[#a0522d] pb-1 mb-2 border-b-2 border-[#e2d1c3]">
            {title}
        </h2>
        {children}
    </section>
);

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ resumeData, activeTemplate, setActiveTemplate }, ref) => {
  const { personalInfo, experience, education, skills, extras } = resumeData;

  const hardSkills = skills.filter(s => s.type === 'hard');
  const softSkills = skills.filter(s => s.type === 'soft');

  const groupedExtras = useMemo(() => {
    return extras.reduce((acc, extra) => {
        (acc[extra.title] = acc[extra.title] || []).push(extra);
        return acc;
    }, {} as Record<string, ExtraEntry[]>);
  }, [extras]);
  
  const getExtraIcon = (title: string) => {
      switch(title) {
          case 'Certifications': return <AcademicCapIcon className="w-4 h-4 text-[#8c4b2a]" />;
          case 'Projects': return <BriefcaseIcon className="w-4 h-4 text-[#8c4b2a]" />;
          case 'Languages': return <GlobeAltIcon className="w-4 h-4 text-[#8c4b2a]" />;
          case 'Awards': return <SparklesIcon className="w-4 h-4 text-[#8c4b2a]" />;
          default: return <DocumentTextIcon className="w-4 h-4 text-[#8c4b2a]" />;
      }
  }

  return (
    <aside className="w-1/2 flex-shrink-0 p-6 bg-black/5 overflow-y-auto">
      <div className="sticky top-6">
        <div className="mb-4">
            <label className="font-bold text-sm mb-2 block text-[#4a3735]">Template Switcher</label>
            <select
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value as TemplateKey)}
              className="w-full p-2 border rounded-md bg-white/50 focus:ring-2 focus:ring-[#a0522d] outline-none"
            >
              {TEMPLATES.map(t => <option key={t.key} value={t.key}>{t.name}</option>)}
            </select>
        </div>
        <div className="aspect-[8.5/11] w-full shadow-2xl overflow-hidden">
          <div ref={ref} className="bg-white p-6 text-xs text-[#3d3d3d] h-full overflow-y-auto font-sans">
            <header className="flex items-center gap-6 mb-4">
                {personalInfo.photo ? (
                    <img src={personalInfo.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon className="w-10 h-10 text-gray-400" />
                    </div>
                )}
                <div className="flex-grow">
                    <h1 className="text-3xl font-bold text-[#4a3735] font-serif">{personalInfo.fullName}</h1>
                    <p className="text-lg font-medium text-[#8c4b2a]">{personalInfo.jobTitle}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-2">
                        {personalInfo.email && <span className="flex items-center gap-1.5"><EnvelopeIcon className="w-3 h-3"/>{personalInfo.email}</span>}
                        {personalInfo.phone && <span className="flex items-center gap-1.5"><PhoneIcon className="w-3 h-3"/>{personalInfo.phone}</span>}
                        {personalInfo.linkedIn && <span className="flex items-center gap-1.5"><LinkIcon className="w-3 h-3"/>{personalInfo.linkedIn}</span>}
                        {personalInfo.portfolio && <span className="flex items-center gap-1.5"><GlobeAltIcon className="w-3 h-3"/>{personalInfo.portfolio}</span>}
                    </div>
                </div>
            </header>

            {personalInfo.summary && <Section title="Summary"><p className="text-xs">{personalInfo.summary}</p></Section>}
            
            {experience.length > 0 && <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3">
                        <div className="flex justify-between items-baseline">
                           <h3 className="font-bold text-sm text-[#4a3735]">{exp.jobTitle}</h3>
                           <p className="text-xs font-medium text-gray-500">{exp.startDate} – {exp.endDate}</p>
                        </div>
                        <p className="font-semibold text-gray-700">{exp.company} {exp.location && `| ${exp.location}`}</p>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-gray-600">
                            {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>}

            {education.length > 0 && <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2">
                         <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-sm text-[#4a3735]">{edu.institution}</h3>
                            <p className="text-xs font-medium text-gray-500">{edu.graduationDate}</p>
                        </div>
                        <p className="font-semibold text-gray-700">{edu.degree}, {edu.fieldOfStudy}</p>
                        {edu.description && <p className="text-gray-600 text-xs mt-0.5">{edu.description}</p>}
                    </div>
                ))}
            </Section>}
            
            {skills.length > 0 && <Section title="Skills">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    <div>
                        <h4 className="font-bold mb-1 text-gray-700">Hard Skills</h4>
                        <div className="space-y-1">
                            {hardSkills.map(skill => <div key={skill.id} className="flex justify-between items-center"><span className="text-xs">{skill.name}</span> <SkillLevelIndicator /></div>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold mb-1 text-gray-700">Soft Skills</h4>
                        <div className="space-y-1">
                            {softSkills.map(skill => <div key={skill.id} className="flex justify-between items-center"><span className="text-xs">{skill.name}</span> <SkillLevelIndicator /></div>)}
                        </div>
                    </div>
                </div>
            </Section>}

            {Object.keys(groupedExtras).length > 0 && <Section title="Extras">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {Object.entries(groupedExtras).map(([title, items]) => (
                        <div key={title}>
                            <h4 className="font-bold mb-1 text-gray-700 flex items-center gap-2">
                                {getExtraIcon(title)} {title}
                            </h4>
                            <ul className="list-disc list-inside text-gray-600">
                                {items.map(item => <li key={item.id}>{item.content}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>}

          </div>
        </div>
      </div>
    </aside>
  );
});

export default ResumePreview;