import React, { useState, useMemo, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import ExportControls from './ExportControls';
import useLocalStorage from '../hooks/useLocalStorage';
import { INITIAL_RESUME_DATA } from '../constants';
import { ArrowLeftIcon } from './icons';
import type { ResumeData, TemplateKey, ActiveSection, ResumeComplexity } from '../types';

declare const jspdf: any;
declare const html2canvas: any;

interface BuilderProps {
  initialTemplate: TemplateKey;
  initialComplexity: ResumeComplexity;
  onBackToDashboard: () => void;
}

const Builder: React.FC<BuilderProps> = ({ initialTemplate, initialComplexity, onBackToDashboard }) => {
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>('resumeData', INITIAL_RESUME_DATA);
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>(initialTemplate);
  const [activeComplexity, setActiveComplexity] = useState<ResumeComplexity>(initialComplexity);
  // FIX: Added state for activeSection and setActiveSection which were used but not defined.
  const [activeSection, setActiveSection] = useState<ActiveSection>('personalInfo');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (activeTemplate) {
      case 'creative':
        setOrientation('landscape');
        break;
      default:
        setOrientation('portrait');
        break;
    }
  }, [activeTemplate]);

  const resumeTextForAI = useMemo(() => {
    return Object.values(resumeData).map(section => {
      if (typeof section === 'object' && section !== null) {
        if (Array.isArray(section)) {
          return section.map(item => Object.values(item).join(' ')).join('\n');
        }
        return Object.values(section).join(' ');
      }
      return '';
    }).join('\n\n');
  }, [resumeData]);

  const handleExport = async (format: 'PDF' | 'DOCX' | 'HTML') => {
    if (!previewRef.current) {
      alert('Preview not available for export.');
      return;
    }
    const resumeNode = previewRef.current;
    const fileName = `${resumeData.personalInfo.fullName.replace(' ', '_')}_Resume`;

    switch (format) {
      case 'PDF':
        try {
          const canvas = await html2canvas(resumeNode, { scale: 2 });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jspdf.jsPDF({
            orientation: orientation,
            unit: 'px',
            format: orientation === 'portrait' ? [canvas.width, canvas.height] : [canvas.height, canvas.width]
          });
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save(`${fileName}.pdf`);
        } catch (error) {
          console.error("Error generating PDF:", error);
          alert("Could not generate PDF. Please try again.");
        }
        break;
      
      case 'HTML':
        const htmlContent = `<!DOCTYPE html><html><head><title>${fileName}</title><style>/* Add basic styling here if needed */</style></head><body>${resumeNode.innerHTML}</body></html>`;
        const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
        const htmlUrl = URL.createObjectURL(htmlBlob);
        const htmlLink = document.createElement('a');
        htmlLink.href = htmlUrl;
        htmlLink.download = `${fileName}.html`;
        htmlLink.click();
        URL.revokeObjectURL(htmlUrl);
        break;

      case 'DOCX':
        const docxContent = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>_</title></head>
            <body>${resumeNode.innerHTML}</body>
            </html>
        `;
        const docxBlob = new Blob([docxContent], { type: 'application/msword' });
        const docxUrl = URL.createObjectURL(docxBlob);
        const docxLink = document.createElement('a');
        docxLink.href = docxUrl;
        docxLink.download = `${fileName}.doc`;
        docxLink.click();
        URL.revokeObjectURL(docxUrl);
        break;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
        <header className="flex-shrink-0 bg-white/30 backdrop-blur-sm p-2 flex items-center justify-between shadow-md">
            <button
                onClick={onBackToDashboard}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-[#4a3735] hover:bg-black/10 transition-colors"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Dashboard</span>
            </button>
             <h1 className="text-lg sm:text-xl font-bold text-[#4a3735] text-center flex-grow">Resume Builder</h1>
             <div className="w-12 sm:w-[130px]" aria-hidden="true"></div>
        </header>
        <main className="flex-grow flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="flex-grow flex flex-col md:flex-row">
                <ResumeForm
                    activeSection={activeSection}
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    resumeTextForAI={resumeTextForAI}
                />
                <ResumePreview
                    ref={previewRef}
                    resumeData={resumeData}
                    activeTemplate={activeTemplate}
                    setActiveTemplate={setActiveTemplate}
                    activeComplexity={activeComplexity}
                    setActiveComplexity={setActiveComplexity}
                    orientation={orientation}
                    setOrientation={setOrientation}
                />
            </div>
        </main>
        <ExportControls onExport={handleExport} />
    </div>
  );
};

export default Builder;