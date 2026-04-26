import { ArrowLeft, Target, Flame, Trophy, Award, ChevronRight, Shield, Bell, Lock, User, LogOut, Timer, Rocket, Moon, BrainCircuit, AlertCircle, MapPin, Zap, FlaskConical, Sigma } from 'lucide-react';

interface ProfileProps {
  onNavigate: (screen: 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview') => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const readiness = 74;
  const stamina = "4.2h";

  const masteryBadges = [
    { icon: <Zap className="w-4 h-4 text-orange-400" />, color: 'orange', shadow: 'rgba(249,115,22,0.3)' },
    { icon: <FlaskConical className="w-4 h-4 text-emerald-400" />, color: 'emerald', shadow: 'rgba(52,211,153,0.3)' },
    { icon: <Sigma className="w-4 h-4 text-blue-400" />, color: 'blue', shadow: 'rgba(96,165,250,0.3)' },
  ];

  return (
    <div className="min-h-full pb-32 pt-4">
      {/* Header */}
      <div className="px-6 pt-8 pb-3">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.1)] active:scale-90 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-[26px] font-[800] tracking-[-0.02em] text-white">Profile</h1>
        </div>

        {/* --- ULTRA-COMPACT PROFILE (TYPOGRAPHY PRECISION) --- */}
        <div className="bg-[#121212]/70 backdrop-blur-[50px] rounded-[32px] p-6 border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.6),inset_0_1px_rgba(255,255,255,0.05)] relative overflow-hidden transition-all duration-500">
          <div className="absolute top-[-10%] right-[-5%] w-[150px] h-[150px] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>

          {/* Top Header Section */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-[-2.5px] rounded-full border-[0.5px] border-orange-500/40 animate-[pulse_4s_linear_infinite]"></div>
                <div className="w-[52px] h-[52px] rounded-full border border-orange-500/30 p-0.5 bg-black/40 shadow-inner">
                  <img src="/profile_avatar.png" alt="Aspirant" className="w-full h-full rounded-full object-cover grayscale-[5%]" />
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-[19px] font-[800] text-white tracking-tight leading-none">Aspirant</h2>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 shadow-[0_4px_10px_rgba(249,115,22,0.1)]">
                    <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                    <span className="text-[9px] font-[800] text-orange-400 uppercase tracking-[0.1em]">Warrior</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-[800] text-white/30 uppercase tracking-[0.14em] leading-none">Class 11th</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Identity Row (Linear) */}
          <div className="flex items-center justify-between px-2 py-3 mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] relative z-10">
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-[800] text-white/20 uppercase tracking-[0.14em] leading-none">Target</span>
              <span className="text-[13px] font-[800] text-white/95 leading-none tracking-tight">JEE 2027</span>
            </div>
            <div className="w-[1px] h-6 bg-white/[0.08]"></div>
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-[800] text-white/20 uppercase tracking-[0.14em] leading-none">Est. AIR</span>
              <span className="text-[13px] font-[800] text-white px-2 leading-none uppercase tracking-tight">Top 1%</span>
            </div>
            <div className="w-[1px] h-6 bg-white/[0.08]"></div>
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-[800] text-white/20 uppercase tracking-[0.14em] leading-none">Exam Ready</span>
              <span className="text-[13px] font-[800] text-emerald-400 leading-none tabular-nums tracking-tight">{readiness}%</span>
            </div>
          </div>

          {/* Attributes Matrix */}
          <div className="grid grid-cols-3 gap-2.5 mb-7 relative z-10">
            <div className="flex flex-col items-center justify-center py-4 rounded-[22px] bg-white/[0.02] border border-white/[0.04] backdrop-blur-md transition-all hover:bg-white/[0.04]">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mb-2 border border-blue-500/10 shadow-inner">
                <Timer className="w-4 h-4 text-blue-400/70" />
              </div>
              <span className="text-[14px] font-[800] text-white/95 tabular-nums leading-none mb-1.5">{stamina}</span>
              <span className="text-[9px] font-[800] text-white/20 uppercase tracking-[0.12em] leading-none">Stamina</span>
            </div>

            <div className="flex flex-col items-center justify-center py-4 rounded-[22px] bg-white/[0.02] border border-white/[0.04] backdrop-blur-md transition-all hover:bg-white/[0.04]">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mb-2 border border-purple-500/10 shadow-inner">
                <Moon className="w-4 h-4 text-purple-400/70" />
              </div>
              <span className="text-[11px] font-[800] text-white/90 leading-none mb-1.5 tracking-tight uppercase">Night Owl</span>
              <span className="text-[9px] font-[800] text-white/20 uppercase tracking-[0.12em] leading-none">Peak</span>
            </div>

            <div className="flex flex-col items-center justify-center py-4 rounded-[22px] bg-white/[0.02] border border-white/[0.04] backdrop-blur-md transition-all hover:bg-white/[0.04]">
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mb-2 border border-red-500/10 shadow-inner">
                <AlertCircle className="w-4 h-4 text-red-500/70" />
              </div>
              <span className="text-[11px] font-[800] text-white/90 leading-none mb-1.5 tracking-tight uppercase">Org Chem</span>
              <span className="text-[9px] font-[800] text-white/20 uppercase tracking-[0.12em] leading-none">Hurdle</span>
            </div>
          </div>

          {/* High-Fidelity Footer */}
          <div className="flex items-center justify-between pt-5 border-t border-white/[0.08] relative z-10">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-[800] text-white/20 uppercase tracking-[0.16em] leading-none">Aspiration</span>
              <span className="text-[14px] font-[800] text-white tracking-[0.08em] uppercase opacity-95">IIT BOMBAY CSE</span>
            </div>
            <div className="flex -space-x-2.5">
              {masteryBadges.map((badge, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border border-white/[0.1] bg-white/5 backdrop-blur-xl flex items-center justify-center ring-1 ring-white/5 transition-transform hover:-translate-y-1 hover:z-20 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {badge.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Settings */}
      <div className="px-6 mb-6">
        <h2 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40 mb-4 pl-1">Settings</h2>
        <div className="space-y-[10px]">
          <SettingItem icon={<User className="w-[18px] h-[18px]" />} title="Account Settings" />
          <SettingItem icon={<Bell className="w-[18px] h-[18px]" />} title="Notifications" badge="On" />
          <SettingItem icon={<Lock className="w-[18px] h-[18px]" />} title="Distraction Filters" />
          <SettingItem icon={<Shield className="w-[18px] h-[18px]" />} title="Parent/Mentor Access" />
          <SettingItem icon={<LogOut className="w-[18px] h-[18px]" />} title="Sign Out" danger />
        </div>
      </div>
    </div>
  );
}


function SettingItem({
  icon,
  title,
  badge,
  danger,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`w-full backdrop-blur-xl rounded-[24px] p-4 border shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] transition-all text-left flex items-center justify-between group hover:scale-[1.02] active:scale-[0.98] ${danger
          ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20'
          : 'bg-white/5 border-white/10 hover:bg-white/10'
        }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-11 h-11 rounded-[16px] shadow-[inset_0_1px_rgba(255,255,255,0.2)] border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${danger ? 'bg-red-500/10 text-red-400 border-red-500/20 drop-shadow-[0_0_5px_rgba(248,113,113,0.4)]' : 'bg-white/5 text-white/80 border-white/10'
          }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-[700] text-[16px] tracking-[-0.01em] ${danger ? 'text-red-400' : 'text-white'}`}>{title}</h3>
        </div>
        {badge ? (
          <span className="bg-green-400/20 backdrop-blur-md text-green-300 border border-green-400/30 text-[11px] px-3 py-1 rounded-full font-bold tracking-wider shadow-[0_0_8px_rgba(74,222,128,0.2)]">
            {badge}
          </span>
        ) : (
          <ChevronRight className={`w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform ${danger ? 'text-red-400/50' : 'text-white/30'}`} />
        )}
      </div>
    </button>
  );
}
