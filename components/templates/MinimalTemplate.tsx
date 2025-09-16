import React, { forwardRef } from 'react';
import type { ResumeData, ResumeComplexity } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
  complexity: ResumeComplexity;
}

const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <section>
        <h2 className="text-xs font-bold uppercase tracking-[.2em] text-[#8b5e34] mb-3">{title}</h2>
        {children}
    </section>
);


const SimpleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills } = resumeData;
    return (
        <>
            <header className="text-center mb-8">
                <h1 className="text-5xl font-thin tracking-widest uppercase">{personalInfo.fullName}</h1>
                <p className="text-lg font-light text-[#8b5e34] mt-1 tracking-wider">{personalInfo.jobTitle}</p>
            </header>
            <main className="space-y-6">
                {personalInfo.summary && <Section title="Summary"><p className="leading-relaxed">{personalInfo.summary}</p></Section>}
                {experience.length > 0 && <Section title="Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <h3 className="font-bold text-base text-gray-800">{exp.jobTitle}</h3>
                            <p className="font-medium text-gray-600">{exp.company} <span className="text-xs">({exp.startDate} - {exp.endDate})</span></p>
                            <div className="mt-1 text-gray-700 leading-relaxed text-[9px]">
                                {exp.description.split('\n').map((line, i) => line.trim() && <p key={i}>{line.replace(/^-/, '•').trim()}</p>)}
                            </div>
                        </div>
                    ))}
                </Section>}
                {education.length > 0 && <Section title="Education">
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                           <h3 className="font-bold text-base text-gray-800">{edu.degree}</h3>
                           <p className="font-medium text-gray-600">{edu.institution}, {edu.graduationDate}</p>
                        </div>
                    ))}
                </Section>}
                {skills.length > 0 && <Section title="Skills">
                    <p>{skills.map(s => s.name).join(' · ')}</p>
                </Section>}
                 <Section title="Contact">
                    <p className="text-center">{personalInfo.email} · {personalInfo.phone} · {personalInfo.linkedIn}</p>
                 </Section>
            </main>
        </>
    );
};

const MiddleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills, extras } = resumeData;
    return (
        <div className="grid grid-cols-3 gap-8">
            <main className="col-span-2 space-y-6">
                <header>
                    <h1 className="text-5xl font-thin tracking-widest uppercase">{personalInfo.fullName}</h1>
                    <p className="text-lg font-light text-[#8b5e34] mt-1 tracking-wider">{personalInfo.jobTitle}</p>
                </header>
                {personalInfo.summary && <Section title="Summary"><p className="leading-relaxed">{personalInfo.summary}</p></Section>}
                {experience.length > 0 && <Section title="Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                               <h3 className="font-bold text-base text-gray-800">{exp.jobTitle}</h3>
                               <p className="text-xs font-normal text-gray-500">{exp.startDate} – {exp.endDate}</p>
                            </div>
                            <p className="font-medium text-gray-600">{exp.company}</p>
                            <div className="mt-1 space-y-1 text-gray-700 leading-relaxed text-[9px]">
                                {exp.description.split('\n').map((line, i) => line.trim() && <p key={i}>{line.replace(/^-/, '•').trim()}</p>)}
                            </div>
                        </div>
                    ))}
                </Section>}
            </main>

            <aside className="col-span-1 space-y-6 pt-[5.75rem]">
                <Section title="Contact">
                    <div className="space-y-1">
                        <p>{personalInfo.email}</p>
                        <p>{personalInfo.phone}</p>
                        <p>{personalInfo.linkedIn}</p>
                        <p>{personalInfo.portfolio}</p>
                    </div>
                </Section>
                 {education.length > 0 && <Section title="Education">
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                            <h3 className="font-bold text-base text-gray-800">{edu.degree}</h3>
                            <p className="font-medium text-gray-600">{edu.institution}</p>
                            <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                        </div>
                    ))}
                </Section>}

                {skills.length > 0 && <Section title="Skills">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {skills.map(skill => (
                            <span key={skill.id}>{skill.name}</span>
                        ))}
                    </div>
                </Section>}
                
                {extras.length > 0 && <section>
                    {extras.map(extra => (
                       <div key={extra.id} className="mb-3">
                            <h2 className="text-xs font-bold uppercase tracking-[.2em] text-[#8b5e34] mb-2">{extra.title}</h2>
                            <p className="leading-relaxed">{extra.content}</p>
                       </div>
                    ))}
                </section>}
            </aside>
        </div>
    );
};

const ComplexLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills } = resumeData;
    return (
        <div className="p-8">
            <header className="mb-6 border-b border-[#8b5e34]/30 pb-4">
                <h1 className="text-5xl font-thin tracking-widest uppercase">{personalInfo.fullName}</h1>
                <p className="text-lg font-light text-[#8b5e34] mt-1 tracking-wider">{personalInfo.jobTitle}</p>
            </header>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    {personalInfo.summary && <Section title="Summary"><p className="leading-relaxed">{personalInfo.summary}</p></Section>}
                    {skills.length > 0 && <Section title="Skills">
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {skills.map(skill => (
                                <span key={skill.id}>{skill.name}</span>
                            ))}
                        </div>
                    </Section>}
                    {education.length > 0 && <Section title="Education">
                        {education.map(edu => (
                            <div key={edu.id} className="mb-2">
                                <h3 className="font-bold text-base text-gray-800">{edu.degree}</h3>
                                <p className="font-medium text-gray-600">{edu.institution} - {edu.graduationDate}</p>
                            </div>
                        ))}
                    </Section>}
                </div>
                 <div>
                     <Section title="Contact">
                        <div className="space-y-1">
                            <p><strong>Email:</strong> {personalInfo.email}</p>
                            <p><strong>Phone:</strong> {personalInfo.phone}</p>
                            <p><strong>LinkedIn:</strong> {personalInfo.linkedIn}</p>
                        </div>
                    </Section>
                </div>
            </div>
             <hr className="border-[#8b5e34]/30 my-4" />
             {experience.length > 0 && <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="font-bold text-base text-gray-800">{exp.jobTitle}, {exp.company}</h3>
                        <p className="text-xs font-normal text-gray-500">{exp.startDate} – {exp.endDate}</p>
                        <div className="mt-1 space-y-1 text-gray-700 leading-relaxed text-[9px]">
                            {exp.description.split('\n').map((line, i) => line.trim() && <p key={i}>{line.replace(/^-/, '').trim()}</p>)}
                        </div>
                    </div>
                ))}
            </Section>}
        </div>
    );
};


const MinimalTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ resumeData, complexity }, ref) => {
    return (
        <div ref={ref} className="w-full h-full bg-white text-[#5d4037] font-sans text-[9.5px] p-10 overflow-y-auto">
            {complexity === 'simple' && <SimpleLayout resumeData={resumeData} />}
            {complexity === 'middle' && <MiddleLayout resumeData={resumeData} />}
            {complexity === 'complex' && <ComplexLayout resumeData={resumeData} />}
        </div>
    );
});

export default MinimalTemplate;
