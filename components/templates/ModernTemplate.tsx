import React, { forwardRef, useMemo } from 'react';
import type { ResumeData, ExtraEntry, ResumeComplexity } from '../../types';
import { EnvelopeIcon, PhoneIcon, LinkIcon, GlobeAltIcon, UserIcon } from '../icons';

interface TemplateProps {
  resumeData: ResumeData;
  complexity: ResumeComplexity;
}

const SkillBar: React.FC<{ skill: string }> = ({ skill }) => (
    <div>
        <p className="text-xs">{skill}</p>
        <div className="w-full bg-white/50 rounded-full h-1 mt-0.5">
            <div className="bg-[#8c4b2a] h-1 rounded-full" style={{width: `${Math.floor(Math.random() * 40) + 60}%`}}></div>
        </div>
    </div>
);

const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="resume-section">
        <h2 className="font-bold font-serif text-lg text-[#8c4b2a] border-b-2 border-[#e2d1c3] pb-1 mb-2">{title}</h2>
        {children}
    </div>
);

const SimpleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills, extras } = resumeData;
    return (
        <div className="p-6 space-y-4">
            <header className="text-center border-b-2 border-[#e2d1c3] pb-3 resume-section">
                <h1 className="text-3xl font-bold font-serif">{personalInfo.fullName}</h1>
                <p className="text-lg font-medium text-[#8c4b2a]">{personalInfo.jobTitle}</p>
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs mt-2">
                    {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
                    {personalInfo.phone && <p className="break-all">{personalInfo.phone}</p>}
                    {personalInfo.linkedIn && <p className="break-all">{personalInfo.linkedIn}</p>}
                </div>
            </header>
            {personalInfo.summary && <Section title="Summary"><p>{personalInfo.summary}</p></Section>}
            {experience.length > 0 && <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-2">
                        <h3 className="font-bold text-base">{exp.jobTitle} at {exp.company}</h3>
                        <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                        <ul className="list-disc list-inside mt-1 text-gray-600 text-[8px]">
                            {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>}
             {education.length > 0 && <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-1">
                        <h3 className="font-bold text-base">{edu.degree}, {edu.institution}</h3>
                        <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                    </div>
                ))}
            </Section>}
             {skills.length > 0 && <Section title="Skills"><p>{skills.map(s => s.name).join(', ')}</p></Section>}
        </div>
    );
};

const MiddleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills, extras } = resumeData;
    const hardSkills = skills.filter(s => s.type === 'hard');
    const softSkills = skills.filter(s => s.type === 'soft');

    const groupedExtras = useMemo(() => {
        return extras.reduce((acc, extra) => {
            (acc[extra.title] = acc[extra.title] || []).push(extra);
            return acc;
        }, {} as Record<string, ExtraEntry[]>);
    }, [extras]);
    
    return (
        <div className="flex w-full min-h-full">
            <div className="w-1/3 bg-[#e2d1c3] p-4 flex flex-col gap-3 resume-section">
                 {personalInfo.photo ? (
                    <img src={personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto" />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-white/50 flex items-center justify-center mx-auto">
                        <UserIcon className="w-12 h-12 text-gray-400" />
                    </div>
                )}
                <div className="text-center">
                    <h1 className="text-2xl font-bold font-serif">{personalInfo.fullName}</h1>
                    <p className="text-base font-medium text-[#8c4b2a]">{personalInfo.jobTitle}</p>
                </div>
                
                <div className="space-y-1">
                    <h2 className="font-bold uppercase tracking-wider text-sm border-b-2 border-white/50 pb-1 mb-1">Contact</h2>
                    {personalInfo.email && <div className="flex items-start gap-1.5">
                        <EnvelopeIcon className="w-3 h-3 flex-shrink-0 mt-px"/>
                        <span className="break-all">{personalInfo.email}</span>
                    </div>}
                    {personalInfo.phone && <div className="flex items-start gap-1.5">
                        <PhoneIcon className="w-3 h-3 flex-shrink-0 mt-px"/>
                        <span className="break-all">{personalInfo.phone}</span>
                    </div>}
                    {personalInfo.linkedIn && <div className="flex items-start gap-1.5">
                        <LinkIcon className="w-3 h-3 flex-shrink-0 mt-px"/>
                        <span className="break-all">{personalInfo.linkedIn}</span>
                    </div>}
                    {personalInfo.portfolio && <div className="flex items-start gap-1.5">
                        <GlobeAltIcon className="w-3 h-3 flex-shrink-0 mt-px"/>
                        <span className="break-all">{personalInfo.portfolio}</span>
                    </div>}
                </div>

                {hardSkills.length > 0 && <div className="space-y-1">
                    <h2 className="font-bold uppercase tracking-wider text-sm border-b-2 border-white/50 pb-1 mb-1">Hard Skills</h2>
                    {hardSkills.map(skill => <p key={skill.id}>{skill.name}</p>)}
                </div>}
                
                {softSkills.length > 0 && <div className="space-y-1">
                    <h2 className="font-bold uppercase tracking-wider text-sm border-b-2 border-white/50 pb-1 mb-1">Soft Skills</h2>
                    {softSkills.map(skill => <p key={skill.id}>{skill.name}</p>)}
                </div>}

                {Object.entries(groupedExtras).map(([title, items]) => (
                    <div key={title} className="space-y-1">
                        <h2 className="font-bold uppercase tracking-wider text-sm border-b-2 border-white/50 pb-1 mb-1">{title}</h2>
                         {items.map(item => <p key={item.id}>{item.content}</p>)}
                    </div>
                ))}
            </div>

            <div className="w-2/3 p-4 space-y-3">
                 {personalInfo.summary && <Section title="Summary"><p>{personalInfo.summary}</p></Section>}
                {experience.length > 0 && <Section title="Experience">
                    {experience.map(exp => (
                         <div key={exp.id} className="mb-2 p-2 rounded-md bg-white/50">
                            <div className="flex justify-between items-baseline">
                               <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                               <p className="font-medium text-gray-500">{exp.startDate} – {exp.endDate}</p>
                            </div>
                            <p className="font-semibold text-gray-700">{exp.company} {exp.location && `| ${exp.location}`}</p>
                            <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-600">
                                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>}
                
                {education.length > 0 && <Section title="Education">
                    {education.map(edu => (
                        <div key={edu.id} className="mb-1 p-2 rounded-md bg-white/50">
                             <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-base">{edu.institution}</h3>
                                <p className="font-medium text-gray-500">{edu.graduationDate}</p>
                            </div>
                            <p className="font-semibold text-gray-700">{edu.degree}, {edu.fieldOfStudy}</p>
                            {edu.description && <p className="text-gray-600 mt-0.5">{edu.description}</p>}
                        </div>
                    ))}
                </Section>}
            </div>
        </div>
    );
}

const ComplexLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills, extras } = resumeData;
    const hardSkills = skills.filter(s => s.type === 'hard');
    
    return (
        <div className="flex w-full min-h-full">
            <div className="w-[35%] bg-[#e2d1c3] p-4 flex flex-col resume-section">
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold font-serif">{personalInfo.fullName}</h1>
                    <p className="text-lg font-medium text-[#8c4b2a]">{personalInfo.jobTitle}</p>
                </div>
                
                <div className="space-y-2 text-xs">
                    {personalInfo.email && <div className="flex items-start gap-1.5">
                        <EnvelopeIcon className="w-3.5 h-3.5 flex-shrink-0 mt-px"/>
                        <span className="break-all">{personalInfo.email}</span>
                    </div>}
                    {personalInfo.phone && <div className="flex items-start gap-1.5">
                        <PhoneIcon className="w-3.5 h-3.5 flex-shrink-0 mt-px"/>
                        <span className="break-all">{personalInfo.phone}</span>
                    </div>}
                    {personalInfo.linkedIn && <div className="flex items-start gap-1.5">
                        <LinkIcon className="w-3.5 h-3.5 flex-shrink-0 mt-px"/>
                        <span className="break-all">{personalInfo.linkedIn}</span>
                    </div>}
                    {personalInfo.portfolio && <div className="flex items-start gap-1.5">
                        <GlobeAltIcon className="w-3.5 h-3.5 flex-shrink-0 mt-px"/>
                        <span className="break-all">{personalInfo.portfolio}</span>
                    </div>}
                </div>
                <hr className="my-3 border-white/50"/>
                {personalInfo.summary && <p className="text-xs">{personalInfo.summary}</p>}
                <hr className="my-3 border-white/50"/>

                {hardSkills.length > 0 && <div className="space-y-2">
                    <h2 className="font-bold uppercase tracking-wider text-base">Skills</h2>
                    {hardSkills.map(skill => <SkillBar key={skill.id} skill={skill.name} />)}
                </div>}
                <hr className="my-3 border-white/50"/>

                 {education.length > 0 && <div className="space-y-2">
                    <h2 className="font-bold uppercase tracking-wider text-base">Education</h2>
                    {education.map(edu => (
                        <div key={edu.id} className="text-xs">
                            <h3 className="font-bold">{edu.institution}</h3>
                            <p>{edu.degree}</p>
                            <p className="text-gray-600">{edu.graduationDate}</p>
                        </div>
                    ))}
                </div>}
            </div>

            <div className="w-[65%] p-4 space-y-3">
                {experience.length > 0 && <Section title="Experience">
                    {experience.map(exp => (
                         <div key={exp.id} className="mb-2">
                            <div className="flex justify-between items-baseline">
                               <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                               <p className="font-medium text-gray-500 text-xs">{exp.startDate} – {exp.endDate}</p>
                            </div>
                            <p className="font-semibold text-gray-700">{exp.company} {exp.location && `| ${exp.location}`}</p>
                            <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-600">
                                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>}
                {extras.length > 0 && <Section title="Projects & More">
                     {extras.map(item => (
                        <div key={item.id} className="mb-2">
                            <h3 className="font-bold text-base">{item.title}</h3>
                            <p className="text-xs">{item.content}</p>
                        </div>
                    ))}
                </Section>}
            </div>
        </div>
    );
};

const ModernTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ resumeData, complexity }, ref) => {
    return (
        <div ref={ref} className="w-full h-full bg-[#fdfbfb] text-[#4a3735] font-sans text-[8px] overflow-y-auto resume-container">
            {complexity === 'simple' && <SimpleLayout resumeData={resumeData} />}
            {complexity === 'middle' && <MiddleLayout resumeData={resumeData} />}
            {complexity === 'complex' && <ComplexLayout resumeData={resumeData} />}
        </div>
    );
});

export default ModernTemplate;