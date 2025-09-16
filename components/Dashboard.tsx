import React, { useState } from 'react';
import { TEMPLATES } from '../constants';
import type { Template, TemplateKey, ResumeComplexity } from '../types';

interface DashboardProps {
  onStartBuilding: (template: TemplateKey, complexity: ResumeComplexity) => void;
}

const TemplateCard: React.FC<{ template: Template; onClick: () => void; isSelected: boolean }> = ({ template, onClick, isSelected }) => (
  <div
    className={`group relative cursor-pointer overflow-hidden rounded-lg bg-white/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 ${isSelected ? 'ring-4 ring-offset-2 ring-[#a0522d]' : ''}`}
    onClick={onClick}
  >
    <img src={template.imageUrl} alt={template.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 p-4 text-white">
      <h3 className="text-xl font-bold">{template.name}</h3>
      <p className="text-sm opacity-90">{template.description}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ onStartBuilding }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey | null>(null);
  const [selectedComplexity, setSelectedComplexity] = useState<ResumeComplexity>('simple');

  const complexities: { key: ResumeComplexity, name: string }[] = [
      { key: 'simple', name: 'Simple Resume' },
      { key: 'middle', name: 'Middle Class Resume' },
      { key: 'complex', name: 'Complex Resume' }
  ];
  
  const handleStart = () => {
      if (selectedTemplate) {
          onStartBuilding(selectedTemplate, selectedComplexity);
      } else {
          alert("Please select a template first.");
      }
  };

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <header className="mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-[#4a3735] mb-4">
          Logic League Resume Builder
        </h1>
        <p className="text-lg md:text-xl text-[#6d5b59] max-w-3xl mx-auto">
          Craft a premium, AI-powered resume that stands out. Select a template and format to begin your journey to a dream job.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">1. Choose a Template</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {TEMPLATES.map((template) => (
            <TemplateCard 
              key={template.key} 
              template={template} 
              onClick={() => setSelectedTemplate(template.key)}
              isSelected={selectedTemplate === template.key} 
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">2. Select Your Resume Complexity</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          {complexities.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedComplexity(c.key)}
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedComplexity === c.key
                  ? 'bg-gradient-to-r from-[#a0522d] to-[#8c4b2a] text-white shadow-lg'
                  : 'bg-white/50 backdrop-blur-sm text-[#4a3735] hover:bg-white/80'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={handleStart}
        disabled={!selectedTemplate}
        className="px-12 py-4 rounded-full text-xl font-bold text-white bg-gradient-to-r from-[#a0522d] to-[#8c4b2a] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Start Building
      </button>
    </div>
  );
};

export default Dashboard;