import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

interface SubPageWrapperProps {
  title: string;
  children: React.ReactNode;
  onBack: () => void;
}

export function SubPageWrapper({ title, children, onBack }: SubPageWrapperProps) {
  return (
    <div className="flex flex-col min-h-full">
      {/* SubPage Header */}
      <div className="px-6 pt-10 pb-6 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
        </button>
        <div>
          <h2 className="text-[11px] font-black text-white/30 uppercase tracking-[0.25em] mb-1">Details</h2>
          <h1 className="text-[24px] font-[800] text-white tracking-tight">{title}</h1>
        </div>
      </div>

      {/* Content Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pb-24"
      >
        {children}
      </motion.div>
    </div>
  );
}
