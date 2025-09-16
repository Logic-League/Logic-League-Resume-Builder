import React, { forwardRef } from 'react';
import type { ResumeData, ResumeComplexity } from '../../types';
import { EnvelopeIcon, PhoneIcon, LinkIcon, GlobeAltIcon, UserIcon } from '../icons';

interface TemplateProps {
  resumeData: ResumeData;
  complexity: ResumeComplexity;
}

const SkillBar: React.FC<{ skill: string; level?: number }> = ({ skill, level = 80 }) => (
    <div>
        <p className="text-sm font-medium">{skill}</p>
        <div className="w-full bg-orange-200 rounded-full h-1.5 mt-1">
            <div className="bg-white h-1.5 rounded-full" style={{width: `${level}%`}}></div>
        </div>
    </div>
);

const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <section>
        <h2 className="text-xl font-bold text-orange-500 border-b-2 border-black/10 pb-1 mb-2">{title}</h2>
        {children}
    </section>
);


const SimpleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills } = resumeData;
    return (
        <div className="p-6 bg-white text-black">
            <header className="text-left mb-6">
                <h1 className="text-5xl font-extrabold text-orange-500 tracking-tighter">{personalInfo.fullName}</h1>
                <p className="text-2xl font-light text-black mt-1">{personalInfo.jobTitle}</p>
            </header>
            <div className="mb-4 text-xs space-y-1 border-y-2 border-black/10 py-2">
                <p><strong>Email:</strong> {personalInfo.email}</p>
                <p><strong>Phone:</strong> {personalInfo.phone}</p>
                <p><strong>LinkedIn:</strong> {personalInfo.linkedIn}</p>
            </div>
            <div className="space-y-4">
                {experience.length > 0 && <Section title="Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-2">
                            <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                            <p className="font-semibold">{exp.company} <span className="text-gray-500 text-sm">({exp.startDate} - {exp.endDate})</span></p>
                            <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700 text-xs">
                                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>}
                 {education.length > 0 && <Section title="Education">
                    {education.map(edu => (
                        <div key={edu.id}><p><span className="font-bold">{edu.degree}</span> from {edu.institution} ({edu.graduationDate})</p></div>
                    ))}
                </Section>}
                {skills.length > 0 && <Section title="Skills"><p className="text-sm">{skills.map(s => s.name).join(' | ')}</p></Section>}
            </div>
        </div>
    );
};

const MiddleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills } = resumeData;
    const hardSkills = skills.filter(s => s.type === 'hard');
    const softSkills = skills.filter(s => s.type === 'soft');
    return (
        <div className="w-full h-full bg-white text-black font-sans text-[10px] grid grid-cols-3 grid-rows-6 gap-4 p-6 overflow-y-auto">
            <header className="col-span-2 row-span-2 bg-orange-500 text-white p-6 flex flex-col justify-center rounded-lg">
                <h1 className="text-5xl font-extrabold tracking-tighter">{personalInfo.fullName}</h1>
                <p className="text-2xl font-light mt-1">{personalInfo.jobTitle}</p>
            </header>

            <div className="col-span-1 row-span-2 bg-black text-white p-4 flex flex-col justify-center space-y-2 rounded-lg text-xs">
                {personalInfo.phone && <p className="flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-orange-500"/>{personalInfo.phone}</p>}
                {personalInfo.email && <p className="flex items-center gap-2"><EnvelopeIcon className="w-4 h-4 text-orange-500"/>{personalInfo.email}</p>}
                {personalInfo.linkedIn && <p className="flex items-center gap-2"><LinkIcon className="w-4 h-4 text-orange-500"/>{personalInfo.linkedIn}</p>}
                {personalInfo.portfolio && <p className="flex items-center gap-2"><GlobeAltIcon className="w-4 h-4 text-orange-500"/>{personalInfo.portfolio}</p>}
            </div>

            <section className="col-span-2 row-span-4 bg-white p-4 rounded-lg space-y-3 border border-black/10">
                <h2 className="text-xl font-bold text-orange-500">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id}>
                        <div className="flex justify-between items-baseline">
                           <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                           <p className="font-medium text-gray-500 text-xs">{exp.startDate} – {exp.endDate}</p>
                        </div>
                        <p className="font-semibold">{exp.company}</p>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700">
                            {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            <section className="col-span-1 row-span-2 bg-orange-500 text-white p-4 rounded-lg space-y-2">
                 <h2 className="text-xl font-bold">Skills</h2>
                 <div className="space-y-2">
                     {hardSkills.slice(0, 3).map(skill => <SkillBar key={skill.id} skill={skill.name} />)}
                     {softSkills.slice(0, 2).map(skill => <SkillBar key={skill.id} skill={skill.name} />)}
                 </div>
            </section>

            <section className="col-span-1 row-span-2 bg-orange-500 text-white p-4 rounded-lg space-y-2">
                 <h2 className="text-xl font-bold">Education</h2>
                {education.map(edu => (
                    <div key={edu.id}>
                        <h3 className="font-bold text-lg">{edu.institution}</h3>
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm opacity-90">{edu.graduationDate}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

const ComplexLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills } = resumeData;
    return (
        <div className="grid grid-cols-5 grid-rows-4 gap-4 p-6 w-full h-full bg-white text-black">
            <header className="col-span-3 row-span-1 p-4 flex flex-col justify-center">
                <h1 className="text-5xl font-extrabold text-orange-500 tracking-tighter">{personalInfo.fullName}</h1>
                <p className="text-2xl font-light text-black mt-1">{personalInfo.jobTitle}</p>
            </header>
            <div className="col-span-2 row-span-1 bg-black text-white p-4 flex items-center justify-center">
                {personalInfo.photo ? <img src={personalInfo.photo} alt="Profile" className="w-28 h-28 rounded-full object-cover" /> : <UserIcon className="w-24 h-24 text-orange-500"/>}
            </div>
            <aside className="col-span-2 row-span-3 bg-orange-500 text-white p-4 space-y-4">
                <div>
                    <h3 className="font-bold text-lg mb-2">CONTACT</h3>
                    <div className="text-sm space-y-1">
                        <p>{personalInfo.phone}</p>
                        <p>{personalInfo.email}</p>
                        <p>{personalInfo.linkedIn}</p>
                    </div>
                </div>
                 <div>
                    <h3 className="font-bold text-lg mb-2">SKILLS</h3>
                    <div className="space-y-2">
                        {skills.slice(0, 5).map(skill => <SkillBar key={skill.id} skill={skill.name} />)}
                    </div>
                </div>
                {education.length > 0 && <div>
                    <h3 className="font-bold text-lg mb-2">EDUCATION</h3>
                    {education.map(edu => (
                        <div key={edu.id}><p className="text-sm"><span className="font-bold">{edu.degree}</span>, {edu.institution}</p></div>
                    ))}
                </div>}
            </aside>
            <main className="col-span-3 row-span-3 p-4 space-y-3 overflow-y-auto">
                 {personalInfo.summary && <Section title="About Me"><p className="text-sm">{personalInfo.summary}</p></Section>}
                 {experience.length > 0 && <Section title="Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-2">
                            <h3 className="font-bold text-lg">{exp.jobTitle} <span className="text-base text-gray-600 font-medium">@ {exp.company}</span></h3>
                            <ul className="list-disc list-inside mt-1 text-gray-700 text-xs">
                                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>}
            </main>
        </div>
    );
};

const CreativeTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ resumeData, complexity }, ref) => {
    return (
        <div ref={ref} className="w-full h-full font-sans overflow-y-auto">
            {complexity === 'simple' && <SimpleLayout resumeData={resumeData} />}
            {complexity === 'middle' && <MiddleLayout resumeData={resumeData} />}
            {complexity === 'complex' && <ComplexLayout resumeData={resumeData} />}
        </div>
    );
});

export default CreativeTemplate;
