import type { ResumeData, Template } from './types';

export const TEMPLATES: Template[] = [
  {
    key: 'modern',
    name: 'Modern',
    description: 'A clean, contemporary design.',
    imageUrl: 'https://picsum.photos/seed/modern/300/400',
  },
  {
    key: 'corporate',
    name: 'Corporate',
    description: 'Professional and structured.',
    imageUrl: 'https://picsum.photos/seed/corporate/300/400',
  },
  {
    key: 'creative',
    name: 'Creative',
    description: 'For roles in design and arts.',
    imageUrl: 'https://picsum.photos/seed/creative/300/400',
  },
  {
    key: 'classic',
    name: 'Classic',
    description: 'Timeless and traditional.',
    imageUrl: 'https://picsum.photos/seed/classic/300/400',
  },
  {
    key: 'minimal',
    name: 'Minimal',
    description: 'Simple, with a focus on content.',
    imageUrl: 'https://picsum.photos/seed/minimal/300/400',
  },
];

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Thabo Nkosi',
    jobTitle: 'Senior Lecturer',
    email: 'thabo.nkosi@email.com',
    phone: '+27 987 654 321',
    linkedIn: 'linkedin.com/in/thabonkosi',
    portfolio: 'thabonkosi.lec',
    summary: 'Experienced lecturer with strong academic background and a record of published research.',
    photo: '',
  },
  education: [
    { id: 'edu1', institution: 'Wits University', degree: 'PhD in Information Systems', fieldOfStudy: 'Information Systems', graduationDate: '2015', description: 'Graduated with honors, Dean\'s List.' },
  ],
  experience: [
    { id: 'exp1', company: 'University of Pretoria', jobTitle: 'Senior Lecturer', location: 'Present', startDate: '2016', endDate: '2025', description: '- Taught over 200 students annually in Information Systems.\n- Published 10 peer-reviewed articles on AI adoption.' },
  ],
  skills: [
    { id: 'skill1', name: 'Research', type: 'hard' },
    { id: 'skill2', name: 'Teaching', type: 'hard' },
    { id: 'skill3', name: 'Academic Writing', type: 'hard' },
    { id: 'skill4', name: 'Data Analysis', type: 'hard' },
    { id: 'skill6', name: 'Team Leadership', type: 'soft' },
    { id: 'skill7', name: 'Problem-Solving', type: 'soft' },
  ],
  extras: [
    { id: 'extra1', title: 'Projects', content: '- Campaign for Nando’s SA (2023) – Social media visuals seen by 2M+ users.\n- UI Design for FinTech startup (2022).'},
  ],
};