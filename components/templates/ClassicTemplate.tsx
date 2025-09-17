import React, { forwardRef } from 'react';
import type { ResumeData, ResumeComplexity } from '../../types';
import { EnvelopeIcon, PhoneIcon, LinkIcon, GlobeAltIcon } from '../icons';

interface TemplateProps {
  resumeData: ResumeData;
  complexity: ResumeComplexity;
}

const Section: React.FC<{title: string, children: React.ReactNode, titleClass?: string, className?: string}> = ({ title, children, titleClass, className }) => (
    <section className={`mb-4 resume-section ${className}`}>
        <h2 className={`text-sm font-bold uppercase tracking-widest border-b-2 border-gray-400 pb-1 mb-2 ${titleClass}`}>{title}</h2>
        {children}
    </section>
);

const SimpleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills, extras } = resumeData;
    return (
        <div className="flex flex-col h-full">
            <header className="text-center mb-6 resume-section">
                <h1 className="text-4xl font-bold tracking-widest">{personalInfo.fullName}</h1>
                <p className="text-lg font-medium text-gray-700 mt-1">{personalInfo.jobTitle}</p>
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-2 font-sans">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
                </div>
            </header>
            
            <main className="flex-grow">
              <hr className="border-gray-600 mb-4" />

              {personalInfo.summary && <Section title="Summary"><p className="text-justify font-sans">{personalInfo.summary}</p></Section>}
              {experience.length > 0 && <Section title="Experience">
                  {experience.map(exp => (
                      <div key={exp.id} className="mb-3 font-sans">
                          <div className="flex justify-between items-baseline gap-4">
                            <h3 className="font-bold text-base break-words">{exp.jobTitle}</h3>
                            <p className="flex-shrink-0 text-xs font-medium text-gray-600">{exp.startDate} – {exp.endDate}</p>
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
            </main>
        </div>
    );
};

const MiddleLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills, extras } = resumeData;
    return (
        <div className="grid grid-cols-4 gap-x-6 h-full">
            <div className="col-span-3">
                <header className="mb-4 resume-section">
                    <h1 className="text-4xl font-bold tracking-widest">{personalInfo.fullName}</h1>
                    <p className="text-lg font-medium text-gray-700 mt-1">{personalInfo.jobTitle}</p>
                </header>
                 {personalInfo.summary && <Section title="Summary"><p className="text-justify font-sans">{personalInfo.summary}</p></Section>}
                {experience.length > 0 && <Section title="Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-3 font-sans">
                            <div className="flex justify-between items-baseline gap-4">
                                <h3 className="font-bold text-base break-words">{exp.jobTitle}</h3>
                                <p className="flex-shrink-0 text-xs font-medium text-gray-600">{exp.startDate} – {exp.endDate}</p>
                            </div>
                            <p className="font-semibold text-gray-800">{exp.company} {exp.location && `| ${exp.location}`}</p>
                            <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700">
                                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>}
            </div>
            <aside className="col-span-1 pt-20 resume-section">
                <Section title="Contact" titleClass="text-gray-800">
                    <div className="font-sans space-y-1 text-xs">
                        {personalInfo.email && <div className="flex items-start gap-2"><EnvelopeIcon className="w-3 h-3 mt-0.5 flex-shrink-0"/><span className="break-all">{personalInfo.email}</span></div>}
                        {personalInfo.phone && <div className="flex items-start gap-2"><PhoneIcon className="w-3 h-3 mt-0.5 flex-shrink-0"/><span className="break-all">{personalInfo.phone}</span></div>}
                        {personalInfo.linkedIn && <div className="flex items-start gap-2"><LinkIcon className="w-3 h-3 mt-0.5 flex-shrink-0"/><span className="break-all">{personalInfo.linkedIn}</span></div>}
                        {personalInfo.portfolio && <div className="flex items-start gap-2"><GlobeAltIcon className="w-3 h-3 mt-0.5 flex-shrink-0"/><span className="break-all">{personalInfo.portfolio}</span></div>}
                    </div>
                </Section>
                {education.length > 0 && <Section title="Education" titleClass="text-gray-800">
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2 font-sans text-xs">
                            <h3 className="font-bold">{edu.degree}</h3>
                            <p className="text-gray-800">{edu.institution}</p>
                            <p className="text-gray-600">{edu.graduationDate}</p>
                        </div>
                    ))}
                </Section>}
                {skills.length > 0 && <Section title="Skills" titleClass="text-gray-800">
                    <ul className="font-sans text-xs space-y-1">
                        {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                    </ul>
                </Section>}
                {extras.length > 0 && <Section title="Extras" titleClass="text-gray-800">
                    {extras.map(extra => (
                        <div key={extra.id} className="mb-2 font-sans text-xs">
                            <h4 className="font-bold text-gray-800">{extra.title}</h4>
                            <p className="text-gray-700">{extra.content}</p>
                        </div>
                    ))}
                </Section>}
            </aside>
        </div>
    );
};

const ComplexLayout: React.FC<{resumeData: ResumeData}> = ({ resumeData }) => {
    const { personalInfo, experience, education, skills, extras } = resumeData;
    return (
        <div className="flex flex-col h-full">
            <header className="text-center pt-2 resume-section">
                <h1 className="text-4xl font-bold tracking-widest">{personalInfo.fullName}</h1>
                <p className="text-lg font-medium text-gray-700 mt-1">{personalInfo.jobTitle}</p>
            </header>
            <div className="border-t-2 border-b-2 border-gray-400 my-2 py-1">
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 font-sans">
                    {personalInfo.email && <span className="flex items-center gap-1"><EnvelopeIcon className="w-3 h-3"/>{personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1"><PhoneIcon className="w-3 h-3"/>{personalInfo.phone}</span>}
                    {personalInfo.linkedIn && <span className="flex items-center gap-1"><LinkIcon className="w-3 h-3"/>{personalInfo.linkedIn}</span>}
                    {personalInfo.portfolio && <span className="flex items-center gap-1"><GlobeAltIcon className="w-3 h-3"/>{personalInfo.portfolio}</span>}
                </div>
            </div>
            
            <main className="flex-grow grid grid-cols-3 gap-x-6">
                <div className="col-span-2">
                    {personalInfo.summary && <Section title="Summary"><p className="text-justify font-sans">{personalInfo.summary}</p></Section>}
                    {experience.length > 0 && <Section title="Experience">
                        {experience.map(exp => (
                            <div key={exp.id} className="mb-3 font-sans">
                                <div className="flex justify-between items-baseline gap-4">
                                <h3 className="font-bold text-base break-words">{exp.jobTitle}</h3>
                                <p className="flex-shrink-0 text-xs font-medium text-gray-600">{exp.startDate} – {exp.endDate}</p>
                                </div>
                                <p className="font-semibold text-gray-800">{exp.company} {exp.location && `| ${exp.location}`}</p>
                                <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700">
                                    {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^-/, '').trim()}</li>)}
                                </ul>
                            </div>
                        ))}
                    </Section>}
                </div>
                <div className="col-span-1">
                    {skills.length > 0 && <Section title="Skills">
                        <ul className="font-sans text-xs space-y-1">
                            {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                        </ul>
                    </Section>}
                    {education.length > 0 && <Section title="Education">
                        {education.map(edu => (
                            <div key={edu.id} className="mb-2 font-sans text-xs">
                                <h3 className="font-bold">{edu.degree}</h3>
                                <p className="text-gray-800">{edu.institution}</p>
                                <p className="text-gray-600">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </Section>}
                    {extras.length > 0 && <Section title="Extras">
                         {extras.map(extra => (
                            <div key={extra.id} className="mb-2 font-sans text-xs">
                                <h4 className="font-bold text-gray-800">{extra.title}</h4>
                                <p className="text-gray-700">{extra.content}</p>
                            </div>
                        ))}
                    </Section>}
                </div>
            </main>
        </div>
    );
};

const ClassicTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ resumeData, complexity }, ref) => {
    return (
        <div ref={ref} className="w-full h-full bg-white text-gray-900 font-serif text-[10px] p-8 overflow-y-auto resume-container">
            {complexity === 'simple' && <SimpleLayout resumeData={resumeData} />}
            {complexity === 'middle' && <MiddleLayout resumeData={resumeData} />}
            {complexity === 'complex' && <ComplexLayout resumeData={resumeData} />}
        </div>
    );
});

export default ClassicTemplate;
