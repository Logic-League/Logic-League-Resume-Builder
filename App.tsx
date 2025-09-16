import React, { useState, useCallback } from 'react';
import Dashboard from './components/Dashboard';
import Builder from './components/Builder';
import type { TemplateKey, ResumeComplexity } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'builder'>('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('modern');
  const [selectedComplexity, setSelectedComplexity] = useState<ResumeComplexity>('middle');

  const handleStartBuilding = useCallback((template: TemplateKey, complexity: ResumeComplexity) => {
    setSelectedTemplate(template);
    setSelectedComplexity(complexity);
    setCurrentPage('builder');
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setCurrentPage('dashboard');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] via-[#e2d1c3] to-[#d3bdae] text-[#4a3735]">
      {currentPage === 'dashboard' && <Dashboard onStartBuilding={handleStartBuilding} />}
      {currentPage === 'builder' && (
        <Builder
          initialTemplate={selectedTemplate}
          initialComplexity={selectedComplexity}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default App;