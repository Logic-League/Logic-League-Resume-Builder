
import React, { useState } from 'react';
import { TEMPLATES } from '../constants';
import type { Template, TemplateKey } from '../types';

interface DashboardProps {
  onStartBuilding: (template: TemplateKey) => void;
}

const TemplateCard: React.FC<{ template: Template; onClick: () => void }> = ({ template, onClick }) => (
  <div
    className="group relative cursor-pointer overflow-hidden rounded-lg bg-white/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105"
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
  const [selectedFormat, setSelectedFormat] = useState('Simple');

  const handleFormatClick = (format: string) => {
    setSelectedFormat(format);
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
        <h2 className="text-3xl font-bold mb-8">Choose a Template</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {TEMPLATES.map((template) => (
            <TemplateCard key={template.key} template={template} onClick={() => onStartBuilding(template.key)} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Select Your Resume Complexity</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          {['Simple Resume', 'Middle Class Resume', 'Complex Resume'].map((format) => (
            <button
              key={format}
              onClick={() => handleFormatClick(format)}
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedFormat === format
                  ? 'bg-gradient-to-r from-[#a0522d] to-[#8c4b2a] text-white shadow-lg'
                  : 'bg-white/50 backdrop-blur-sm text-[#4a3735] hover:bg-white/80'
              }`}
            >
              {format}
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={() => onStartBuilding('modern')}
        className="px-12 py-4 rounded-full text-xl font-bold text-white bg-gradient-to-r from-[#a0522d] to-[#8c4b2a] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      >
        Start Building
      </button>
    </div>
  );
};

export default Dashboard;
