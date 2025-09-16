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
    fullName: 'Jane Doe',
    jobTitle: 'Software Engineer',
    email: 'jane.doe@example.com',
    phone: '(123) 456-7890',
    linkedIn: 'linkedin.com/in/janedoe',
    portfolio: 'janedoe.dev',
    summary: 'Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing user-centered digital products from initial concept to final, polished deliverable.',
    photo: '',
  },
  education: [
    { id: 'edu1', institution: 'State University', degree: 'B.S. in Computer Science', fieldOfStudy: 'Computer Science', graduationDate: '2018', description: 'Graduated with honors, Dean\'s List.' },
  ],
  experience: [
    { id: 'exp1', company: 'Tech Corp', jobTitle: 'Senior Software Engineer', location: 'San Francisco, CA', startDate: '2020', endDate: 'Present', description: '- Led a team of 5 engineers in developing a new flagship product.\n- Implemented new features which increased user engagement by 20%.' },
    { id: 'exp2', company: 'Innovate LLC', jobTitle: 'Software Engineer', location: 'Palo Alto, CA', startDate: '2018', endDate: '2020', description: '- Developed and maintained front-end and back-end services for customer-facing applications.\n- Collaborated with UX/UI designers to create intuitive user interfaces.' },
  ],
  skills: [
    { id: 'skill1', name: 'React', type: 'hard' },
    { id: 'skill2', name: 'TypeScript', type: 'hard' },
    { id: 'skill3', name: 'Node.js', type: 'hard' },
    { id: 'skill4', name: 'SQL', type: 'hard' },
    { id: 'skill5', name: 'Agile Methodologies', type: 'hard' },
    { id: 'skill6', name: 'Team Leadership', type: 'soft' },
    { id: 'skill7', name: 'Problem-Solving', type: 'soft' },
  ],
  extras: [
    { id: 'extra1', title: 'Projects', content: 'Built a predictive analytics dashboard using Python and Power BI, deployed on AWS.'},
    { id: 'extra2', title: 'Certifications', content: 'AWS Certified Cloud Practitioner (2023)'}
  ],
};