import React, { forwardRef } from 'react';
import type { ResumeData, ResumeComplexity } from '../../types';
import { EnvelopeIcon, PhoneIcon, LinkIcon, GlobeAltIcon } from '../icons';

interface TemplateProps {
  resumeData: ResumeData;
  complexity: ResumeComplexity;
}

const Section: React.FC<{title: string, children: React.ReactNode, titleClass?: string}> = ({ title, children, titleClass }) => (
    <section className="mb-4">
        <h2 className={`text-sm font-bold uppercase tracking-widest border-b-2 border-gray-400 pb-1 mb-2 ${titleClass}`}>{title}</h2>
        {children}
    </section>
);

const SimpleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills, extras } = resumeData;
    return (
        <>
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold tracking-widest">{personalInfo.fullName}</h1>
                <p className="text-lg font-medium text-gray-700 mt-1">{personalInfo.jobTitle}</p>
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-2 font-sans">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
                </div>
            </header>
            
            <hr className="border-gray-600 mb-4" />

            {personalInfo.summary && <Section title="Summary"><p className="text-justify font-sans">{personalInfo.summary}</p></Section>}
            {experience.length > 0 && <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-3 font-sans">
                        <div className="flex justify-between items-baseline">
                           <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                           <p className="text-xs font-medium text-gray-600">{exp.startDate} – {exp.endDate}</p>
                        </div>
                        <p className="font-semibold text-gray-800">{exp.company} {exp.location && `| ${exp.location}`}</p>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700">
                            {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                        </ul>
                    </div>
                ))}
            </Section>}
            {education.length > 0 && <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-2 font-sans">
                         <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-base">{edu.degree}</h3>
                            <p className="text-xs font-medium text-gray-600">{edu.graduationDate}</p>
                        </div>
                        <p className="font-semibold text-gray-800">{edu.institution}, {edu.fieldOfStudy}</p>
                    </div>
                ))}
            </Section>}
            {skills.length > 0 && <Section title="Skills"><p className="font-sans">{skills.map(skill => skill.name).join(' • ')}</p></Section>}
            {extras.length > 0 && <Section title="Additional Information">
                {extras.map(extra => (
                    <div key={extra.id} className="mb-2 font-sans">
                        <h4 className="font-bold text-gray-800">{extra.title}</h4>
                        <p className="text-gray-700">{extra.content}</p>
                    </div>
                ))}
            </Section>}
        </>
    );
};

const MiddleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills, extras } = resumeData;
    return (
        <div className="grid grid-cols-4 gap-x-6">
            <div className="col-span-3">
                <header className="mb-4">
                    <h1 className="text-4xl font-bold tracking-widest">{personalInfo.fullName}</h1>
                    <p className="text-lg font-medium text-gray-700 mt-1">{personalInfo.jobTitle}</p>
                </header>
                {personalInfo.summary && <Section title="Summary"><p className="text-justify font-sans">{personalInfo.summary}</p></Section>}
                {experience.length > 0 && <Section title="Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-3 font-sans">
                            <h3 className="font-bold text-base">{exp.jobTitle} at {exp.company}</h3>
                            <p className="text-xs font-medium text-gray-600">{exp.startDate} – {exp.endDate}</p>
                            <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700">
                                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>}
            </div>
            <aside className="col-span-1 border-l-2 border-gray-300 pl-4 pt-[7.5rem]">
                <div className="space-y-4 font-sans text-xs">
                    <div>
                        <h3 className="font-bold mb-1">CONTACT</h3>
                        <p>{personalInfo.email}</p>
                        <p>{personalInfo.phone}</p>
                        <p>{personalInfo.linkedIn}</p>
                    </div>
                     {education.length > 0 && <div>
                        <h3 className="font-bold mb-1">EDUCATION</h3>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-1">
                                <p className="font-semibold">{edu.degree}</p>
                                <p>{edu.institution}</p>
                                <p className="text-gray-600">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>}
                     {skills.length > 0 && <div>
                        <h3 className="font-bold mb-1">SKILLS</h3>
                        <p>{skills.map(skill => skill.name).join(', ')}</p>
                    </div>}
                </div>
            </aside>
        </div>
    );
};

const ComplexLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills, extras } = resumeData;
    return (
        <div className="text-gray-800">
            <header className="bg-gray-100 p-6 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold tracking-widest text-blue-900">{personalInfo.fullName}</h1>
                    <p className="text-lg font-medium text-gray-700 mt-1">{personalInfo.jobTitle}</p>
                </div>
                <div className="text-right text-xs font-sans space-y-1">
                     <p className="flex items-center justify-end gap-2"><EnvelopeIcon className="w-3 h-3"/> {personalInfo.email}</p>
                     <p className="flex items-center justify-end gap-2"><PhoneIcon className="w-3 h-3"/> {personalInfo.phone}</p>
                     <p className="flex items-center justify-end gap-2"><LinkIcon className="w-3 h-3"/> {personalInfo.linkedIn}</p>
                </div>
            </header>
             <main className="p-6">
                 {personalInfo.summary && <Section title="Summary" titleClass="text-blue-900"><p className="text-justify font-sans">{personalInfo.summary}</p></Section>}
                 <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        {experience.length > 0 && <Section title="Experience" titleClass="text-blue-900">
                            {experience.map(exp => (
                                <div key={exp.id} className="mb-3 font-sans">
                                    <h3 className="font-bold text-base">{exp.jobTitle}, {exp.company}</h3>
                                    <p className="text-xs font-medium text-gray-600">{exp.startDate} – {exp.endDate}</p>
                                    <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700">
                                        {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </Section>}
                    </div>
                    <div className="col-span-1">
                        {education.length > 0 && <Section title="Education" titleClass="text-blue-900">
                            {education.map(edu => (
                                <div key={edu.id} className="mb-2 font-sans">
                                    <h3 className="font-bold text-base">{edu.degree}</h3>
                                    <p className="font-semibold text-gray-800">{edu.institution}</p>
                                    <p className="text-xs font-medium text-gray-600">{edu.graduationDate}</p>
                                </div>
                            ))}
                        </Section>}
                        {skills.length > 0 && <Section title="Skills" titleClass="text-blue-900">
                            <ul className="font-sans list-disc list-inside">
                                {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                            </ul>
                        </Section>}
                    </div>
                 </div>
            </main>
        </div>
    );
};

const ClassicTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ resumeData, complexity }, ref) => {
    return (
        <div ref={ref} className="w-full h-full bg-white text-black font-serif text-[10px] p-8 overflow-y-auto">
            {complexity === 'simple' && <SimpleLayout resumeData={resumeData} />}
            {complexity === 'middle' && <MiddleLayout resumeData={resumeData} />}
            {complexity === 'complex' && <ComplexLayout resumeData={resumeData} />}
        </div>
    );
});

export default ClassicTemplate;
