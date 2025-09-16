import React, { useState, useCallback } from 'react';
import type { ResumeData, ActiveSection } from '../types';
import { getSmartSuggestions, analyzeJobDescription } from '../services/geminiService';
import { SparklesIcon, PlusCircleIcon, TrashIcon } from './icons';

interface ResumeFormProps {
  activeSection: ActiveSection;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  resumeTextForAI: string;
}

const PersonalInfoForm: React.FC<Omit<ResumeFormProps, 'activeSection' | 'resumeTextForAI'>> = ({ resumeData, setResumeData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, photo: reader.result as string },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="fullName" value={resumeData.personalInfo.fullName} onChange={handleChange} placeholder="Full Name" className="p-2 border rounded bg-white/50" />
        <input name="jobTitle" value={resumeData.personalInfo.jobTitle} onChange={handleChange} placeholder="Job Title" className="p-2 border rounded bg-white/50" />
        <input name="email" value={resumeData.personalInfo.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded bg-white/50" />
        <input name="phone" value={resumeData.personalInfo.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded bg-white/50" />
        <input name="linkedIn" value={resumeData.personalInfo.linkedIn} onChange={handleChange} placeholder="LinkedIn Profile URL" className="p-2 border rounded bg-white/50" />
        <input name="portfolio" value={resumeData.personalInfo.portfolio} onChange={handleChange} placeholder="Portfolio/Website URL" className="p-2 border rounded bg-white/50" />
      </div>
      <div className="mt-4">
          <label className="block text-sm font-medium text-[#4a3735] mb-1">Profile Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-[#a0522d] hover:file:bg-violet-100" />
          {resumeData.personalInfo.photo && (
            <img src={resumeData.personalInfo.photo} alt="Preview" className="w-20 h-20 rounded-full mt-2 object-cover" />
          )}
      </div>
      <textarea name="summary" value={resumeData.personalInfo.summary} onChange={handleChange} placeholder="Professional Summary" rows={4} className="p-2 border rounded bg-white/50 w-full mt-4" />
    </div>
  );
};

const ExperienceForm: React.FC<Omit<ResumeFormProps, 'activeSection' | 'resumeTextForAI'>> = ({ resumeData, setResumeData }) => {
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newExperience = [...resumeData.experience];
        newExperience[index] = { ...newExperience[index], [name]: value };
        setResumeData(prev => ({ ...prev, experience: newExperience }));
    };

    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { id: Date.now().toString(), company: '', jobTitle: '', location: '', startDate: '', endDate: '', description: '' }]
        }));
    };
    
    const removeExperience = (id: string) => {
        setResumeData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Work Experience</h3>
            {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 border rounded-md bg-white/30 mb-4 relative">
                    <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="jobTitle" value={exp.jobTitle} onChange={(e) => handleChange(index, e)} placeholder="Job Title" className="p-2 border rounded bg-white/50" />
                        <input name="company" value={exp.company} onChange={(e) => handleChange(index, e)} placeholder="Company" className="p-2 border rounded bg-white/50" />
                        <input name="location" value={exp.location} onChange={(e) => handleChange(index, e)} placeholder="Location" className="p-2 border rounded bg-white/50 col-span-2 md:col-span-1" />
                        <div className="flex gap-2 col-span-2 md:col-span-1">
                          <input name="startDate" value={exp.startDate} onChange={(e) => handleChange(index, e)} placeholder="Start Date" className="w-1/2 p-2 border rounded bg-white/50" />
                          <input name="endDate" value={exp.endDate} onChange={(e) => handleChange(index, e)} placeholder="End Date" className="w-1/2 p-2 border rounded bg-white/50" />
                        </div>
                        <textarea name="description" value={exp.description} onChange={(e) => handleChange(index, e)} placeholder="Description & Achievements" rows={4} className="p-2 border rounded bg-white/50 col-span-2" />
                    </div>
                </div>
            ))}
            <button onClick={addExperience} className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/50 hover:bg-white/80">
                <PlusCircleIcon className="w-5 h-5" /> Add Experience
            </button>
        </div>
    );
};

const EducationForm: React.FC<Omit<ResumeFormProps, 'activeSection' | 'resumeTextForAI'>> = ({ resumeData, setResumeData }) => {
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newEducation = [...resumeData.education];
        newEducation[index] = { ...newEducation[index], [name]: value };
        setResumeData(prev => ({ ...prev, education: newEducation }));
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, { id: Date.now().toString(), institution: '', degree: '', fieldOfStudy: '', graduationDate: '', description: '' }]
        }));
    };
    
    const removeEducation = (id: string) => {
        setResumeData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Education</h3>
            {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 border rounded-md bg-white/30 mb-4 relative">
                    <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="institution" value={edu.institution} onChange={(e) => handleChange(index, e)} placeholder="Institution" className="p-2 border rounded bg-white/50" />
                        <input name="degree" value={edu.degree} onChange={(e) => handleChange(index, e)} placeholder="Degree" className="p-2 border rounded bg-white/50" />
                        <input name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleChange(index, e)} placeholder="Field of Study" className="p-2 border rounded bg-white/50" />
                        <input name="graduationDate" value={edu.graduationDate} onChange={(e) => handleChange(index, e)} placeholder="Graduation Date" className="p-2 border rounded bg-white/50" />
                        <textarea name="description" value={edu.description} onChange={(e) => handleChange(index, e)} placeholder="Honors, GPA, relevant coursework..." rows={2} className="p-2 border rounded bg-white/50 col-span-2" />
                    </div>
                </div>
            ))}
            <button onClick={addEducation} className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/50 hover:bg-white/80">
                <PlusCircleIcon className="w-5 h-5" /> Add Education
            </button>
        </div>
    );
};

const SkillsForm: React.FC<Omit<ResumeFormProps, 'activeSection' | 'resumeTextForAI'>> = ({ resumeData, setResumeData }) => {
    const [newSkill, setNewSkill] = useState({ name: '', type: 'hard' as 'hard' | 'soft' });

    const addSkill = () => {
        if (newSkill.name.trim() === '') return;
        setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, { id: Date.now().toString(), ...newSkill }]
        }));
        setNewSkill({ name: '', type: 'hard' });
    };

    const removeSkill = (id: string) => {
        setResumeData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill.id !== id) }));
    };

    const hardSkills = resumeData.skills.filter(s => s.type === 'hard');
    const softSkills = resumeData.skills.filter(s => s.type === 'soft');

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Skills</h3>
            <div className="flex gap-2 mb-4">
                <input 
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill(prev => ({...prev, name: e.target.value}))}
                    placeholder="Add a new skill"
                    className="flex-grow p-2 border rounded bg-white/50"
                />
                <select 
                    value={newSkill.type} 
                    onChange={(e) => setNewSkill(prev => ({...prev, type: e.target.value as 'hard' | 'soft'}))}
                    className="p-2 border rounded bg-white/50"
                >
                    <option value="hard">Hard Skill</option>
                    <option value="soft">Soft Skill</option>
                </select>
                <button onClick={addSkill} className="px-4 py-2 rounded-md bg-white/50 hover:bg-white/80">Add</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold mb-2 text-lg">Hard Skills</h4>
                    <div className="flex flex-wrap gap-2">
                        {hardSkills.map(skill => (
                            <span key={skill.id} className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {skill.name}
                                <button onClick={() => removeSkill(skill.id)} className="text-blue-600 hover:text-blue-800 font-bold">×</button>
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2 text-lg">Soft Skills</h4>
                     <div className="flex flex-wrap gap-2">
                        {softSkills.map(skill => (
                            <span key={skill.id} className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                {skill.name}
                                <button onClick={() => removeSkill(skill.id)} className="text-green-600 hover:text-green-800 font-bold">×</button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExtrasForm: React.FC<Omit<ResumeFormProps, 'activeSection' | 'resumeTextForAI'>> = ({ resumeData, setResumeData }) => {
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newExtras = [...resumeData.extras];
        newExtras[index] = { ...newExtras[index], [name]: value };
        setResumeData(prev => ({ ...prev, extras: newExtras }));
    };

    const addExtra = () => {
        setResumeData(prev => ({
            ...prev,
            extras: [...prev.extras, { id: Date.now().toString(), title: 'Projects', content: '' }]
        }));
    };
    
    const removeExtra = (id: string) => {
        setResumeData(prev => ({ ...prev, extras: prev.extras.filter(extra => extra.id !== id) }));
    };

    const extraTypes = ['Projects', 'Certifications', 'Languages', 'Volunteer Work', 'Awards'];

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Extras</h3>
            <p className="mb-4 text-[#6d5b59]">Add any other relevant sections like projects, certifications, or awards.</p>
            {resumeData.extras.map((extra, index) => (
                <div key={extra.id} className="p-4 border rounded-md bg-white/30 mb-4 relative">
                    <button onClick={() => removeExtra(extra.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col gap-4">
                        <select 
                            name="title" 
                            value={extra.title} 
                            onChange={(e) => handleChange(index, e)}
                            className="p-2 border rounded bg-white/50"
                        >
                            {extraTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                        <textarea name="content" value={extra.content} onChange={(e) => handleChange(index, e)} placeholder="Details..." rows={3} className="p-2 border rounded bg-white/50" />
                    </div>
                </div>
            ))}
            <button onClick={addExtra} className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/50 hover:bg-white/80">
                <PlusCircleIcon className="w-5 h-5" /> Add Section
            </button>
        </div>
    );
};


const AISuggestionsPanel: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchSuggestions = useCallback(async () => {
    setIsLoading(true);
    const result = await getSmartSuggestions(jobTitle);
    setSuggestions(result);
    setIsLoading(false);
  }, [jobTitle]);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">AI Smart Suggestions</h3>
      <p className="mb-4 text-[#6d5b59]">Get AI-powered suggestions for bullet points based on your job title: <strong>{jobTitle || "N/A"}</strong></p>
      <button onClick={handleFetchSuggestions} disabled={isLoading || !jobTitle} className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#a0522d] to-[#8c4b2a] text-white disabled:opacity-50">
        <SparklesIcon className="w-5 h-5"/>
        {isLoading ? 'Generating...' : 'Get Suggestions'}
      </button>
      {suggestions.length > 0 && (
        <div className="mt-4 p-4 bg-white/40 rounded-md space-y-2">
          {suggestions.map((s, i) => <p key={i} className="p-2 bg-white/50 rounded">{s}</p>)}
        </div>
      )}
    </div>
  );
};

const JobMatcherPanel: React.FC<{ resumeText: string }> = ({ resumeText }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = useCallback(async () => {
        setIsLoading(true);
        const result = await analyzeJobDescription(jobDescription, resumeText);
        setAnalysis(result);
        setIsLoading(false);
    }, [jobDescription, resumeText]);

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Job Description Matcher</h3>
            <p className="mb-4 text-[#6d5b59]">Paste a job description to see how your resume matches and get suggestions for improvement.</p>
            <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                rows={8}
                className="w-full p-2 border rounded bg-white/50"
            />
            <button onClick={handleAnalyze} disabled={isLoading || !jobDescription} className="mt-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#a0522d] to-[#8c4b2a] text-white disabled:opacity-50">
                {isLoading ? 'Analyzing...' : 'Analyze'}
            </button>
            {analysis && (
                <div className="mt-4 p-4 bg-white/40 rounded-md">
                    <h4 className="font-bold mb-2">Analysis Result:</h4>
                    <p className="whitespace-pre-wrap">{analysis}</p>
                </div>
            )}
        </div>
    );
};


const ResumeForm: React.FC<ResumeFormProps> = ({ activeSection, resumeData, setResumeData, resumeTextForAI }) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'personalInfo':
        return <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'experience':
        return <ExperienceForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'education':
        return <EducationForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'skills':
        return <SkillsForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'extras':
        return <ExtrasForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 'ai-suggestions':
        return <AISuggestionsPanel jobTitle={resumeData.personalInfo.jobTitle} />;
      case 'job-matcher':
        return <JobMatcherPanel resumeText={resumeTextForAI} />;
      default:
        return <p>Select a section to edit.</p>;
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-white/10">
      <div className="max-w-3xl mx-auto">
        {renderSection()}
      </div>
    </div>
  );
};

export default ResumeForm;