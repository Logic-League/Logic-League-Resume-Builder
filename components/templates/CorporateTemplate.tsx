import React, { forwardRef } from 'react';
import type { ResumeData, ResumeComplexity } from '../../types';
import { EnvelopeIcon, PhoneIcon, LinkIcon, GlobeAltIcon } from '../icons';

interface TemplateProps {
  resumeData: ResumeData;
  complexity: ResumeComplexity;
}

const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <section className="mb-3">
        <h2 className="text-lg font-bold font-serif text-blue-900 border-b-2 border-blue-900 pb-1 mb-2">{title.toUpperCase()}</h2>
        {children}
    </section>
);

const SimpleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills } = resumeData;
    return (
        <div className="p-6">
            <header className="bg-blue-900 text-white p-4 text-center mb-4">
                <h1 className="text-3xl font-bold font-serif">{personalInfo.fullName}</h1>
                <p className="text-lg">{personalInfo.jobTitle}</p>
            </header>
            <div className="text-center mb-4 text-xs space-y-1">
                <p>{personalInfo.email} | {personalInfo.phone}</p>
                <p>{personalInfo.linkedIn}</p>
            </div>
            {personalInfo.summary && <Section title="Professional Summary"><p>{personalInfo.summary}</p></Section>}
            {experience.length > 0 && <Section title="Work Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-2">
                        <h3 className="font-bold text-base">{exp.jobTitle}, {exp.company}</h3>
                        <p className="text-xs text-gray-500">{exp.startDate} – {exp.endDate}</p>
                        <ul className="list-disc list-inside mt-1 text-gray-700">
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
            {skills.length > 0 && <Section title="Skills"><p>{skills.map(s => s.name).join(' • ')}</p></Section>}
        </div>
    );
};

const MiddleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills, extras } = resumeData;
    return (
        <>
            <header className="bg-blue-900 text-white p-6 text-center">
                <h1 className="text-4xl font-bold font-serif tracking-wider">{personalInfo.fullName}</h1>
                <p className="text-xl font-light">{personalInfo.jobTitle}</p>
            </header>
            <div className="bg-black text-white py-1 px-6 flex justify-center gap-x-6 gap-y-1 flex-wrap">
                {personalInfo.email && <span className="flex items-center gap-1.5"><EnvelopeIcon className="w-3 h-3"/>{personalInfo.email}</span>}
                {personalInfo.phone && <span className="flex items-center gap-1.5"><PhoneIcon className="w-3 h-3"/>{personalInfo.phone}</span>}
                {personalInfo.linkedIn && <span className="flex items-center gap-1.5"><LinkIcon className="w-3 h-3"/>{personalInfo.linkedIn}</span>}
                {personalInfo.portfolio && <span className="flex items-center gap-1.5"><GlobeAltIcon className="w-3 h-3"/>{personalInfo.portfolio}</span>}
            </div>
            
            <main className="p-6">
                {personalInfo.summary && <Section title="Professional Summary"><p>{personalInfo.summary}</p></Section>}

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        {experience.length > 0 && <Section title="Work Experience">
                            {experience.map(exp => (
                                <div key={exp.id} className="mb-3">
                                    <div className="flex justify-between items-baseline">
                                       <h3 className="font-bold text-base text-black">{exp.jobTitle}</h3>
                                       <p className="text-xs font-medium text-gray-500">{exp.startDate} – {exp.endDate}</p>
                                    </div>
                                    <p className="font-semibold text-gray-600">{exp.company} {exp.location && `| ${exp.location}`}</p>
                                    <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700">
                                        {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </Section>}
                    </div>

                    <div>
                         {education.length > 0 && <Section title="Education">
                            {education.map(edu => (
                                <div key={edu.id} className="mb-2">
                                     <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-base text-black">{edu.institution}</h3>
                                        <p className="text-xs font-medium text-gray-500">{edu.graduationDate}</p>
                                    </div>
                                    <p className="font-semibold text-gray-600">{edu.degree}, {edu.fieldOfStudy}</p>
                                    {edu.description && <p className="text-gray-700 text-xs mt-0.5">{edu.description}</p>}
                                </div>
                            ))}
                        </Section>}

                        {skills.length > 0 && <Section title="Skills">
                            <div className="flex flex-wrap gap-2">
                                {skills.map(skill => (
                                    <span key={skill.id} className="px-2 py-0.5 rounded-full text-sm bg-gray-200 text-black">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </Section>}

                        {extras.length > 0 && <Section title="Additional Information">
                            {extras.map(extra => (
                                <div key={extra.id} className="mb-2">
                                    <h4 className="font-bold text-black">{extra.title}</h4>
                                    <p className="text-gray-700">{extra.content}</p>
                                </div>
                            ))}
                        </Section>}
                    </div>
                </div>
            </main>
        </>
    );
}

const ComplexLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
     const { personalInfo, experience, education, skills, extras } = resumeData;
     return (
        <div className="flex w-full h-full">
            <aside className="w-1/3 bg-black text-white p-4 flex flex-col gap-4">
                 <div>
                    <h1 className="text-3xl font-bold font-serif">{personalInfo.fullName}</h1>
                    <p className="text-lg text-blue-300">{personalInfo.jobTitle}</p>
                </div>
                <div>
                    <h3 className="font-bold border-b border-blue-300 pb-1 mb-2">CONTACT</h3>
                    <div className="text-xs space-y-1">
                        <p>{personalInfo.email}</p>
                        <p>{personalInfo.phone}</p>
                        <p>{personalInfo.linkedIn}</p>
                    </div>
                </div>
                 <div>
                    <h3 className="font-bold border-b border-blue-300 pb-1 mb-2">SKILLS</h3>
                    <div className="text-xs space-y-1.5">
                       {skills.map(skill => (
                           <div key={skill.id}>
                               <p>{skill.name}</p>
                               <div className="w-full bg-gray-600 h-1"><div className="bg-blue-300 h-1" style={{width: '80%'}}></div></div>
                           </div>
                       ))}
                    </div>
                </div>
                {education.length > 0 && <div>
                    <h3 className="font-bold border-b border-blue-300 pb-1 mb-2">EDUCATION</h3>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2 text-xs">
                            <h4 className="font-bold">{edu.degree}</h4>
                            <p>{edu.institution}</p>
                            <p className="text-gray-400">{edu.graduationDate}</p>
                        </div>
                    ))}
                </div>}
            </aside>
            <main className="w-2/3 p-4">
                {personalInfo.summary && <Section title="Professional Summary"><p>{personalInfo.summary}</p></Section>}
                {experience.length > 0 && <Section title="Work Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-3">
                            <h3 className="font-bold text-base text-black">{exp.jobTitle}</h3>
                            <p className="font-semibold text-gray-700">{exp.company} / {exp.startDate} – {exp.endDate}</p>
                            <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700 text-xs">
                                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>}
                {extras.length > 0 && <Section title="Projects">
                     {extras.map(extra => (
                        <div key={extra.id} className="mb-2">
                           <h4 className="font-bold text-black">{extra.title}</h4>
                           <p className="text-gray-700 text-xs">{extra.content}</p>
                        </div>
                    ))}
                </Section>}
            </main>
        </div>
     );
};


const CorporateTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ resumeData, complexity }, ref) => {
    return (
        <div ref={ref} className="w-full h-full bg-white text-black font-sans text-[9px] overflow-y-auto">
            {complexity === 'simple' && <SimpleLayout resumeData={resumeData} />}
            {complexity === 'middle' && <MiddleLayout resumeData={resumeData} />}
            {complexity === 'complex' && <ComplexLayout resumeData={resumeData} />}
        </div>
    );
});

export default CorporateTemplate;