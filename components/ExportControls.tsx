import React from 'react';
import { ArrowDownTrayIcon } from './icons';

interface ExportControlsProps {
  onExport: (format: 'PDF' | 'DOCX' | 'HTML') => void;
}

const ExportControls: React.FC<ExportControlsProps> = ({ onExport }) => {
  return (
    <footer className="flex-shrink-0 bg-white/30 backdrop-blur-sm p-3 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 shadow-[0_-2px_5px_rgba(0,0,0,0.1)]">
      <h3 className="text-lg font-semibold text-[#4a3735] mb-2 sm:mb-0">Export Your Resume:</h3>
      <button
        onClick={() => onExport('PDF')}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 transition-transform"
      >
        <ArrowDownTrayIcon className="w-5 h-5" />
        PDF
      </button>
      <button
        onClick={() => onExport('DOCX')}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 transition-transform"
      >
        <ArrowDownTrayIcon className="w-5 h-5" />
        DOCX
      </button>
      <button
        onClick={() => onExport('HTML')}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold bg-gradient-to-r from-green-500 to-green-700 hover:scale-105 transition-transform"
      >
        <ArrowDownTrayIcon className="w-5 h-5" />
        HTML
      </button>
    </footer>
  );
};

export default ExportControls;