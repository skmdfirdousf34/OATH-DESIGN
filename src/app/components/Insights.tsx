import { ArrowLeft, BrainCircuit, Atom, TestTube, Calculator, Dna } from 'lucide-react';

interface InsightsProps {
  onNavigate: (screen: 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview' | 'insights') => void;
}

export function Insights({ onNavigate }: InsightsProps) {
  const subjectInsights = [
    {
      subject: "Physics",
      icon: <Atom className="w-6 h-6 text-blue-400" />,
      color: "from-blue-500/20 to-blue-900/20",
      border: "border-blue-500/30",
      strong: ["Kinematics", "Work & Energy"],
      weak: ["Rotational Dynamics (Torque)", "Fluid Mechanics"]
    },
    {
      subject: "Chemistry",
      icon: <TestTube className="w-6 h-6 text-orange-400" />,
      color: "from-orange-500/20 to-orange-900/20",
      border: "border-orange-500/30",
      strong: ["Atomic Structure", "Chemical Bonding"],
      weak: ["Ionic Equilibrium", "Thermodynamics (Entropy)"]
    },
    {
      subject: "Mathematics",
      icon: <Calculator className="w-6 h-6 text-purple-400" />,
      color: "from-purple-500/20 to-purple-900/20",
      border: "border-purple-500/30",
      strong: ["Quadratic Equations", "Matrices"],
      weak: ["Complex Numbers (Geometry)", "Calculus (Limits)"]
    },
    {
      subject: "Biology",
      icon: <Dna className="w-6 h-6 text-green-400" />,
      color: "from-green-500/20 to-green-900/20",
      border: "border-green-500/30",
      strong: ["Cell Cycle", "Genetics"],
      weak: ["Plant Physiology", "Biomolecules"]
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
          <h1 className="text-[26px] font-[800] tracking-[-0.02em] text-white">
            Interview Insights
          </h1>
        </div>
      </div>

      <div className="px-6">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40 flex items-center gap-2 pl-1">
             <BrainCircuit className="w-[18px] h-[18px]" />
             Subject Mastery Analysis
           </h2>
        </div>
        
        <div className="space-y-4">
          {subjectInsights.map((item, idx) => (
             <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group">
                <div className={`absolute top-[-30%] right-[-10%] w-[120px] h-[120px] bg-gradient-to-br ${item.color} blur-[40px] rounded-full pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                <div className="flex flex-col mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-[20px] bg-white/5 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.2)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div>
                     <h3 className="font-[800] text-white text-[24px] leading-none tracking-[-0.02em]">{item.subject}</h3>
                       <p className="text-[12px] text-white/40 font-normal mt-1">Based on recent interviews</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5 relative z-10">
                   <div>
                     <div className="text-[11px] uppercase tracking-wider text-green-300 font-bold mb-3 ml-1 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div> Strong Chapters
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {item.strong.map(topic => (
                          <span key={topic} className="bg-green-500/20 backdrop-blur-md text-green-100 border border-green-400/30 shadow-[inset_0_1px_rgba(255,255,255,0.2)] px-3 py-1.5 rounded-full text-[13px] font-bold tracking-wide">
                            {topic}
                          </span>
                        ))}
                     </div>
                   </div>
                   
                   <div className="w-full h-px bg-white/10"></div>
                   
                   <div>
                     <div className="text-[11px] uppercase tracking-wider text-red-300 font-bold mb-3 ml-1 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]"></div> Needs Review
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {item.weak.map(topic => (
                          <span key={topic} className="bg-red-500/20 backdrop-blur-md text-red-100 border border-red-400/30 shadow-[inset_0_1px_rgba(255,255,255,0.2)] px-3 py-1.5 rounded-full text-[13px] font-bold tracking-wide">
                            {topic}
                          </span>
                        ))}
                     </div>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
