import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, School, Target, Star, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─── Types ────────────────────────────────────────────────────── */
type ExamType = 'JEE' | 'NEET';

interface CollegeSuggestion {
  name: string;
  match: number; // 0-100
  logo: string;
  tier: 'Dream' | 'Reach' | 'Safe';
}

/* ─── Mock Data & Heuristics ───────────────────────────────────── */
const COLLEGE_DATABASE: Record<ExamType, CollegeSuggestion[]> = {
  JEE: [
    { name: 'IIT Bombay', match: 92, logo: 'IITB', tier: 'Dream' },
    { name: 'IIT Delhi', match: 88, logo: 'IITD', tier: 'Dream' },
    { name: 'IIT Kanpur', match: 85, logo: 'IITK', tier: 'Dream' },
    { name: 'IIT Madras', match: 82, logo: 'IITM', tier: 'Reach' },
    { name: 'BITS Pilani', match: 78, logo: 'BITS', tier: 'Reach' },
    { name: 'NIT Trichy', match: 72, logo: 'NITT', tier: 'Safe' },
  ],
  NEET: [
    { name: 'AIIMS Delhi', match: 94, logo: 'AIIMS', tier: 'Dream' },
    { name: 'MAMC Delhi', match: 90, logo: 'MAMC', tier: 'Dream' },
    { name: 'AFMC Pune', match: 86, logo: 'AFMC', tier: 'Dream' },
    { name: 'JIPMER', match: 82, logo: 'JIPMER', tier: 'Reach' },
    { name: 'KGMU Lucknow', match: 75, logo: 'KGMU', tier: 'Reach' },
    { name: 'CMC Vellore', match: 70, logo: 'CMC', tier: 'Safe' },
  ]
};

const calculatePredictedAIR = (hours: number, accuracy: number, score: number): number => {
  // Simple heuristic rank predictor
  // Higher accuracy and hours => lower (better) rank
  // Max potential score: (500hrs/500 * 40) + (100acc * 0.4) + (100score * 0.2) = 100
  const normalizedHours = Math.min(hours / 500, 1) * 100;
  const performanceIndex = (normalizedHours * 0.4) + (accuracy * 0.4) + (score * 0.2);
  
  // Exponential scaling for rank (1 to 2,000,000)
  // At performanceIndex = 100, AIR ~ 1
  // At performanceIndex = 0, AIR ~ 2,000,000
  const rank = Math.floor(2000000 * Math.pow(0.85, performanceIndex));
  return Math.max(rank, 1);
};

/* ─── UI Components ─────────────────────────────────────────────── */
function PredictionMetric({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex flex-col items-center p-2 rounded-2xl bg-white/5 border border-white/5 flex-1 transition-all hover:bg-white/10 group">
      <span className={cn("text-[10px] font-bold uppercase tracking-widest mb-1 opacity-40 group-hover:opacity-100 transition-opacity", color)}>
        {label}
      </span>
      <span className="text-[15px] font-black text-white">{value}</span>
    </div>
  );
}

export function AIRPredictionCard() {
  const [examType, setExamType] = React.useState<ExamType>('JEE');
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Mocked global stats (Normally from a store/context)
  const stats = {
    hours: 482,
    accuracy: 86,
    focus: 87
  };

  const predictedAIR = calculatePredictedAIR(stats.hours, stats.accuracy, stats.focus);
  const collegeSuggestions = COLLEGE_DATABASE[examType].slice(0, 3);

  return (
    <div className="bg-[#050505]/80 backdrop-blur-3xl rounded-[40px] p-7 border border-white/[0.08] shadow-[0_32px_64px_rgba(0,0,0,0.6),inset_0_1px_rgba(255,255,255,0.1)] relative overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute top-[-20%] left-[-10%] w-[160px] h-[160px] bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[140px] h-[140px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* Header with Selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-400/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Trophy className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Live Prediction</span>
              <h3 className="text-[14px] font-bold text-white tracking-tight">OATH AIR Estimator</h3>
            </div>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            {(['JEE', 'NEET'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setExamType(type)}
                className={cn(
                  "px-3 py-1 rounded-lg text-[10px] font-black transition-all",
                  examType === type ? "bg-white/10 text-white shadow-lg" : "text-white/30 hover:text-white/50"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Big AIR Counter */}
        <div className="flex flex-col items-center mb-8 relative">
           <div className="absolute -top-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20">
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              <span className="text-[9px] font-black text-amber-200 uppercase tracking-widest">Projected AIR</span>
           </div>
           
           <div className="flex flex-col items-center mt-2">
              <motion.div 
                key={predictedAIR}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-[64px] font-black text-white tracking-[-0.04em] leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                #{predictedAIR.toLocaleString()}
              </motion.div>
              <div className="flex items-center gap-2 mt-2">
                 <div className="flex -space-x-1">
                    {[1,2,3].map(i => <div key={i} className="w-4 h-4 rounded-full bg-white/10 border border-white/5" />)}
                 </div>
                 <span className="text-[11px] font-bold text-white/30 tracking-tight">based on latest activity</span>
              </div>
           </div>
        </div>

        {/* Core Metrics Used */}
        <div className="flex gap-3 mb-8">
           <PredictionMetric label="Focus" value={`${stats.focus}%`} color="text-blue-400" />
           <PredictionMetric label="Accuracy" value={`${stats.accuracy}%`} color="text-purple-400" />
           <PredictionMetric label="Effort" value="High" color="text-amber-400" />
        </div>

        {/* Top 3 College Matches */}
        <div className="mb-4">
           <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex items-center gap-2">
                 <School className="w-4 h-4 text-white/40" />
                 <span className="text-[12px] font-bold text-white/60 uppercase tracking-wide">Probable Colleges</span>
              </div>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[11px] font-bold text-amber-400/80 hover:text-amber-400 flex items-center gap-1 bg-amber-400/5 px-2 py-1 rounded-lg transition-colors"
              >
                Insight <ChevronDown className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-180")} />
              </button>
           </div>

           <div className="space-y-3">
              {collegeSuggestions.map((college, idx) => (
                <motion.div
                  key={college.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/10 transition-all cursor-default"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-[12px] text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all">
                        {college.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                           <span className="text-[14px] font-bold text-white tracking-tight">{college.name}</span>
                           <span className={cn(
                             "text-[8px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-wider",
                             college.tier === 'Dream' ? "bg-amber-500/20 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.2)]" :
                             college.tier === 'Reach' ? "bg-blue-500/20 text-blue-400" : "bg-cyan-500/20 text-cyan-400"
                           )}>
                             {college.tier}
                           </span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-24 h-[3px] bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${college.match}%` }}
                                className="h-full bg-gradient-to-r from-white/20 to-white/60"
                              />
                           </div>
                           <span className="text-[10px] font-black text-white/30">{college.match}% match</span>
                        </div>
                      </div>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Star className="w-3.5 h-3.5 text-amber-300" fill="currentColor" />
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Footer Insight */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4 pt-4 border-t border-white/5"
            >
              <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-400/10">
                 <div className="flex items-start gap-3">
                    <Target className="w-4 h-4 text-amber-300 mt-1 flex-shrink-0" />
                    <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                      Based on your current trajectory, you are in the top <span className="text-amber-200">2% of performers</span> this week. Increase <span className="text-purple-300">Accuracy</span> by 4% to bridge the match gap for {collegeSuggestions[0].name}.
                    </p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
