import { ArrowLeft, Lock, Instagram, Youtube, Gamepad2, Film, Globe, CheckCircle2, XCircle } from 'lucide-react';

interface DistractionProps {
  onNavigate: (screen: 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview' | 'distraction') => void;
}

export function Distraction({ onNavigate }: DistractionProps) {
  const blockedApps = [
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, category: 'Social Media' },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, category: 'Entertainment' },
    { name: 'Games', icon: <Gamepad2 className="w-5 h-5" />, category: 'Gaming' },
    { name: 'Netflix', icon: <Film className="w-5 h-5" />, category: 'OTT' },
    { name: 'General Web', icon: <Globe className="w-5 h-5" />, category: 'Browsing' },
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
            Focus Parameters
          </h1>
        </div>
      </div>

      <div className="px-6 mb-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none"></div>
           <p className="text-[13px] text-white/60 leading-relaxed font-normal relative z-10">
             During an active session, these parameters are strictly enforced to guarantee deep work and zero interruptions.
           </p>
        </div>
      </div>

      {/* Blocking Status */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40 flex items-center gap-2">
             <Lock className="w-4 h-4" />
             Blocked Boundaries
          </h2>
          <div className="flex items-center gap-2 bg-red-500/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-red-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)] animate-pulse"></div>
            <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">Locked</span>
          </div>
        </div>

        <div className="space-y-[8px]">
          {blockedApps.map((app, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-[20px] p-4 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.2)] flex items-center gap-4 transition-all hover:bg-white/10 hover:scale-[1.02] cursor-default"
            >
              <div className="w-11 h-11 rounded-[16px] bg-white/5 flex items-center justify-center flex-shrink-0 text-white border border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.2)]">
                {app.icon}
              </div>
              <div className="flex-1">
                <div className="font-[700] text-white text-[16px] tracking-tight">{app.name}</div>
                <div className="text-[11px] text-white/35 font-normal">{app.category}</div>
              </div>
              <XCircle className="w-[20px] h-[20px] text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.6)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Educational Access */}
      <div className="px-6 mb-8">
        <h2 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40 mb-4 pl-1">Educational Access (Whitelisted)</h2>
        <div className="grid grid-cols-2 gap-3">
          <AllowedItem name="Edu YouTube" />
          <AllowedItem name="Study Websites" />
          <AllowedItem name="AI Tutors" />
          <AllowedItem name="Research Docs" />
        </div>
      </div>

    </div>
  );
}

function AllowedItem({ name }: { name: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-[20px] p-4 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:scale-[1.03] transition-all cursor-default">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.6)] flex-shrink-0" />
        <span className="text-[14px] font-[600] tracking-tight text-white/90">{name}</span>
      </div>
    </div>
  );
}
