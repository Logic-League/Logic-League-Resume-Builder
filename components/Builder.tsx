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
        width: 100vw;
        height: 100vh;
        overflow-y: scroll;
        padding: 2rem;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      /* --- A4 Page Format for Export --- */
      .export-mode .resume-container {
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        margin: 0;
        background: #fff;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        box-sizing: border-box;
        font-size: 10pt;
        display: flex;
        flex-direction: column;
        justify-content: space-between; /* Evenly space content on short resumes */
      }
      .export-mode .resume-section {
        margin-bottom: 1rem;
        page-break-inside: avoid; /* Prevent sections from splitting awkwardly */
      }
      /* --- Print styles for exported HTML/DOCX --- */
      @media print {
        @page {
          size: A4 portrait;
          margin: 0; /* Margin is handled by .resume-container padding */
        }
        body { margin: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .resume-container {
          box-shadow: none !important; margin: 0 !important;
          width: 100% !important; min-height: 297mm !important;
          padding: 20mm !important; box-sizing: border-box !important;
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
    resumeClone.style.aspectRatio = 'auto'; // Remove aspect ratio for correct height calculation
    // FIX: Corrected typo from `resume-clone` to `resumeClone`
    resumeClone.style.height = 'auto'; // Allow the container to grow with content

    exportContainer.appendChild(resumeClone);
    document.body.appendChild(exportContainer);
    
    try {
      // Wait for images and styles to render in the cloned node
      await new Promise(resolve => setTimeout(resolve, 500));

      const externalStyles = `
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #eee; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; }
          /* Apply A4 styles directly for HTML/DOCX viewing */
          ${exportStyles.replace(/.export-mode /g, '').replace('body.export-mode', 'body')}
        </style>
      `;

      switch (format) {
        case 'PDF': {
          const canvas = await html2canvas(resumeClone, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            width: resumeClone.offsetWidth,
            height: resumeClone.offsetHeight,
            scrollX: 0,
            scrollY: -window.scrollY
          });

          const imgData = canvas.toDataURL('image/png');
          const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4'
          });

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const ratio = canvasWidth / pdfWidth;
          const imgHeight = canvasHeight / ratio;

          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;

          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
          }
          
          pdf.save(`${fileName}.pdf`);
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