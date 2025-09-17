import React, { forwardRef } from 'react';
import { TEMPLATES } from '../constants';
import type { ResumeData, TemplateKey, ResumeComplexity } from '../types';
import ModernTemplate from './templates/ModernTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

type Orientation = 'portrait' | 'landscape';

interface ResumePreviewProps {
  resumeData: ResumeData;
  activeTemplate: TemplateKey;
  setActiveTemplate: (template: TemplateKey) => void;
  activeComplexity: ResumeComplexity;
  setActiveComplexity: (complexity: ResumeComplexity) => void;
  orientation: Orientation;
  setOrientation: (orientation: Orientation) => void;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ resumeData, activeTemplate, setActiveTemplate, activeComplexity, setActiveComplexity, orientation, setOrientation }, ref) => {
  
  const handleOrientationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrientation(e.target.value as Orientation);
  };

  const isClassicTemplate = activeTemplate === 'classic';

  const renderTemplate = () => {
    const props = { resumeData, ref, complexity: activeComplexity };
    switch(activeTemplate) {
      case 'modern': return <ModernTemplate {...props} />;
      case 'corporate': return <CorporateTemplate {...props} />;
      case 'creative': return <CreativeTemplate {...props} />;
      case 'classic': return <ClassicTemplate {...props} />;
      case 'minimal': return <MinimalTemplate {...props} />;
      default: return <ModernTemplate {...props} />;
    }
  }

  return (
    <aside className="w-full md:w-1/2 flex-shrink-0 p-4 md:p-6 bg-black/5 overflow-y-auto">
      <div className="md:sticky md:top-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="template-select" className="font-bold text-sm mb-1 block text-[#4a3735]">Template</label>
            <select
              id="template-select"
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value as TemplateKey)}
              className="w-full p-2 border rounded-md bg-white/50 focus:ring-2 focus:ring-[#a0522d] outline-none"
            >
              {TEMPLATES.map(t => <option key={t.key} value={t.key}>{t.name}</option>)}
            </select>
          </div>
          <div>
             <label htmlFor="complexity-select" className="font-bold text-sm mb-1 block text-[#4a3735]">Complexity</label>
            <select
              id="complexity-select"
              value={activeComplexity}
              onChange={(e) => setActiveComplexity(e.target.value as ResumeComplexity)}
              className="w-full p-2 border rounded-md bg-white/50 focus:ring-2 focus:ring-[#a0522d] outline-none"
            >
              <option value="simple">Simple</option>
              <option value="middle">Middle</option>
              <option value="complex">Complex</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="font-bold text-sm mb-1 block text-[#4a3735]">Orientation</label>
            <div className="flex items-center border rounded-md bg-white/50 h-[42px] text-sm">
              <label className={`flex-1 text-center cursor-pointer rounded-l-md py-1 transition-colors ${orientation === 'portrait' ? 'bg-[#a0522d] text-white' : 'hover:bg-gray-100'}`}>
                <input type="radio" name="orientation" value="portrait" checked={orientation === 'portrait'} onChange={handleOrientationChange} className="sr-only"/>
                Portrait
              </label>
              <div className="w-px h-full bg-gray-200"></div>
              <label className={`flex-1 text-center cursor-pointer rounded-r-md py-1 transition-colors ${orientation === 'landscape' ? 'bg-[#a0522d] text-white' : 'hover:bg-gray-100'}`}>
                <input type="radio" name="orientation" value="landscape" checked={orientation === 'landscape'} onChange={handleOrientationChange} className="sr-only"/>
                Landscape
              </label>
            </div>
          </div>
        </div>
        <div className={`w-full shadow-2xl overflow-hidden bg-white ${orientation === 'portrait' ? 'aspect-[8.5/11]' : 'aspect-[11/8.5]'}`}>
            {renderTemplate()}
        </div>
      </div>
    </aside>
  );
});

export default ResumePreview;