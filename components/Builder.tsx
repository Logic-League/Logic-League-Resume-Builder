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
declare const html2pdf: any;

interface BuilderProps {
  initialTemplate: TemplateKey;
  initialComplexity: ResumeComplexity;
  onBackToDashboard: () => void;
}

const Builder: React.FC<BuilderProps> = ({ initialTemplate, initialComplexity, onBackToDashboard }) => {
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>('resumeData', INITIAL_RESUME_DATA);
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>(initialTemplate);
  const [activeComplexity, setActiveComplexity] = useState<ResumeComplexity>(initialComplexity);
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
    const originalResumeNode = previewRef.current;
    const fileName = `${resumeData.personalInfo.fullName.replace(/ /g, '_')}_Resume`;

    const exportStyles = `
      /* --- Base styles for export staging --- */
      body.export-mode { background-color: #eee !important; }
      .export-container {
        position: fixed;
        left: -9999px; /* Hide the container off-screen */
        top: 0;
        z-index: 9999;
        background: #eee;
        padding: 2rem;
        /* Let content define size */
      }
      /* --- A4 Page Format for Export --- */
      .export-mode .resume-container {
        /* This sets the width for html2canvas to capture, accounting for PDF margins. */
        /* A4 page (210mm) - 20mm margins each side = 170mm content width. */
        width: ${orientation === 'portrait' ? '170mm' : '257mm'}; 
        min-height: ${orientation === 'portrait' ? '257mm' : '170mm'}; /* A4 height (297mm) - 40mm margins */
        height: auto; /* Allow content to grow beyond one page */
        padding: 0; /* Margins are handled by PDF generator */
        margin: 0;
        background: #fff;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        box-sizing: border-box;
        font-size: 10pt;
        display: flex;
        flex-direction: column;
        justify-content: flex-start; 
      }
      .export-mode .resume-section {
        page-break-inside: avoid;
      }
      /* --- Print styles for exported HTML/DOCX --- */
      @media print {
        @page {
          size: A4 ${orientation};
          margin: 20mm;
        }
        body { 
          margin: 0; 
          background: #fff; 
          -webkit-print-color-adjust: exact; 
          print-color-adjust: exact; 
        }
        .resume-container {
          box-shadow: none !important; 
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important; 
          min-height: initial !important;
        }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.id = 'export-stylesheet';
    styleSheet.innerHTML = exportStyles;
    document.head.appendChild(styleSheet);
    document.body.classList.add('export-mode');

    const exportContainer = document.createElement('div');
    exportContainer.className = 'export-container';
    
    const resumeClone = originalResumeNode.cloneNode(true) as HTMLElement;
    resumeClone.classList.add('resume-container'); // Ensure the root has the container class for styling
    resumeClone.style.aspectRatio = 'auto'; 
    resumeClone.style.height = 'auto'; // Allow the container to grow with content

    exportContainer.appendChild(resumeClone);
    document.body.appendChild(exportContainer);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const externalStyles = `
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #eee; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; }
          ${exportStyles.replace(/.export-mode /g, '').replace('body.export-mode', 'body')}
        </style>
      `;

      switch (format) {
        case 'PDF': {
          const opt = {
            margin:       20, // 20mm margin
            filename:     `${fileName}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: orientation }
          };
          // html2pdf handles pagination automatically.
          await html2pdf().from(resumeClone).set(opt).save();
          break;
        }

        case 'HTML': {
            const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${fileName}</title>${externalStyles}</head><body>${resumeClone.outerHTML}</body></html>`;
            const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
            const htmlUrl = URL.createObjectURL(htmlBlob);
            const htmlLink = document.createElement('a');
            htmlLink.href = htmlUrl;
            htmlLink.download = `${fileName}.html`;
            document.body.appendChild(htmlLink);
            htmlLink.click();
            document.body.removeChild(htmlLink);
            URL.revokeObjectURL(htmlUrl);
            break;
        }
        
        case 'DOCX': {
            const docxContent = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'><title>${fileName}</title>${externalStyles}</head>
                <body>${resumeClone.outerHTML}</body>
                </html>
            `;
            const docxBlob = new Blob([docxContent], { type: 'application/msword' });
            const docxUrl = URL.createObjectURL(docxBlob);
            const docxLink = document.createElement('a');
            docxLink.href = docxUrl;
            docxLink.download = `${fileName}.doc`;
            document.body.appendChild(docxLink);
            docxLink.click();
            document.body.removeChild(docxLink);
            URL.revokeObjectURL(docxUrl);
            break;
        }
      }
    } catch (error) {
      console.error("Error during export:", error);
      alert("Could not generate file. Please try again.");
    } finally {
      document.head.removeChild(styleSheet);
      document.body.classList.remove('export-mode');
      document.body.removeChild(exportContainer);
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