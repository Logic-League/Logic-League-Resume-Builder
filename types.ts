export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  summary: string;
  photo?: string; // For base64 image data
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: string;
  description: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SkillEntry {
  id:string;
  name: string;
  type: 'hard' | 'soft';
}

export interface ExtraEntry {
  id: string;
  title: string;
  content: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillEntry[];
  extras: ExtraEntry[];
}

export type TemplateKey = 'minimal' | 'corporate' | 'creative' | 'classic' | 'modern';

export interface Template {
  key: TemplateKey;
  name: string;
  description: string;
  imageUrl: string;
}

export type ActiveSection = keyof ResumeData | 'ai-suggestions' | 'job-matcher' | 'customize';

export interface IconProps {
  className?: string;
}