import { ArrowLeft, BookOpen, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface RevisionProps {
  onNavigate: (screen: 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview' | 'insights' | 'revision') => void;
}

export function Revision({ onNavigate }: RevisionProps) {
  const revisionTopics = [
    {
      subject: "Physics",
      topic: "Electrostatics",
      reason: "Low confidence in Gauss's Law applications",
      lastStudied: "14 days ago",
      color: "from-blue-500/20 to-blue-900/20",
      accent: "text-blue-400",
      border: "border-blue-500/30"
    },
    {
      subject: "Chemistry",
      topic: "Chemical Kinetics",
      reason: "Struggling with First Order Reaction half-life",
      lastStudied: "21 days ago",
      color: "from-orange-500/20 to-orange-900/20",
      accent: "text-orange-400",
      border: "border-orange-500/30"
    },
    {
      subject: "Mathematics",
      topic: "Definite Integration",
      reason: "Missing standard properties applications",
      lastStudied: "8 days ago",
      color: "from-purple-500/20 to-purple-900/20",
      accent: "text-purple-400",
      border: "border-purple-500/30"
    },
    {
      subject: "Biology",
      topic: "Human Reproduction",
      reason: "Gaps in hormonal control timelines",
      lastStudied: "30 days ago",
      color: "from-green-500/20 to-green-900/20",
      accent: "text-green-400",
      border: "border-green-500/30"
    }
  ];

  return (
    <div className="min-h-full pb-32 pt-4">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.1)] active:scale-90 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-[24px] font-bold tracking-wide flex items-center gap-2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
            Targeted Revision
          </h1>
        </div>
      </div>

      <div className="px-6">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-[13px] font-bold tracking-widest uppercase text-white/50 flex items-center gap-2 pl-1">
             <BookOpen className="w-[18px] h-[18px]" />
             Requires Improvement
           </h2>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-5 mb-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
           <p className="text-[14px] text-white/80 leading-relaxed font-medium relative z-10">
             These chapters are <span className="text-white font-bold drop-shadow-sm">marked as completed</span>, but algorithms detected knowledge decay or conceptual gaps during recent sessions. Prioritize these for revision.
           </p>
        </div>
        
        <div className="space-y-4">
          {revisionTopics.map((item, idx) => (
             <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group">
                {/* Liquid Glow Effect */}
                <div className={`absolute top-[-50%] right-[-10%] w-[120px] h-[120px] bg-gradient-to-br ${item.color} blur-[50px] rounded-full pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-300`}></div>

                <div className="flex items-start justify-between mb-3 relative z-10">
                   <div>
                     <span className={`text-[11px] font-bold uppercase tracking-wider ${item.accent} bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.2)]`}>{item.subject}</span>
                     <h3 className="font-bold text-white tracking-wide text-[20px] mt-4 leading-tight flex items-center gap-2 drop-shadow-md">
                       {item.topic}
                       <CheckCircle2 className="w-5 h-5 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.6)]" /> 
                     </h3>
                   </div>
                   <div className="w-11 h-11 rounded-[16px] bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.2)] text-orange-400 group-hover:scale-110 transition-transform duration-300">
                     <AlertTriangle className="w-5 h-5 drop-shadow-[0_0_5px_rgba(249,115,22,0.6)] animate-pulse" />
                   </div>
                </div>
                
                <div className="space-y-3 relative z-10">
                   <div className="w-full h-px bg-white/10 my-4"></div>
                   
                   <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                     <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shadow-[0_0_8px_rgba(248,113,113,0.8)]"></div>
                     <p className="text-[13px] text-white/90 font-medium flex-1 leading-relaxed">{item.reason}</p>
                   </div>
                   
                   <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 text-[12px] text-white/50 font-bold uppercase tracking-wider">
                     <Clock className="w-3.5 h-3.5" />
                     Last covered: <span className="text-white/80 normal-case tracking-normal">{item.lastStudied}</span>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
