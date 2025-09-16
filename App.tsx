
import React, { useState, useCallback } from 'react';
import Dashboard from './components/Dashboard';
import Builder from './components/Builder';
import type { TemplateKey } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'builder'>('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('modern');

  const handleStartBuilding = useCallback((template: TemplateKey) => {
    setSelectedTemplate(template);
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
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default App;
