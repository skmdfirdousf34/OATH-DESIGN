import { ArrowLeft, Target, Flame, Trophy, Award, ChevronRight, Shield, Bell, Lock, User, LogOut } from 'lucide-react';

interface ProfileProps {
  onNavigate: (screen: 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview') => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const focusScore = 87;
  const currentStreak = 12;
  const bestStreak = 18;

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
          <h1 className="text-[26px] font-[800] tracking-[-0.02em] text-white">Profile</h1>
        </div>

        {/* Liquid Glass User Info Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-[32px] p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_rgba(255,255,255,0.15)] relative overflow-hidden group hover:bg-white/10 transition-all duration-300">
          <div className="absolute top-[-30%] right-[-10%] w-[150px] h-[150px] bg-gradient-to-br from-purple-600/40 to-blue-600/20 blur-[60px] rounded-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-[64px] h-[64px] rounded-[22px] bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-[26px] font-bold border border-white/30 shadow-[0_0_20px_rgba(168,85,247,0.4),inset_0_1px_rgba(255,255,255,0.4)]">
              A
            </div>
            <div>
              <div className="text-[24px] font-[800] text-white tracking-[-0.02em] leading-none mb-1">Aspirant</div>
              <div className="text-[12px] text-white/40 font-light tracking-wider uppercase">JEE 2027 · Class 11</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/10 relative z-10">
            <div>
              <div className="text-[10px] text-white/35 font-[700] uppercase tracking-[0.15em] mb-1">Score</div>
              <div className="text-[30px] font-[800] text-white leading-none tracking-tight">{focusScore}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/35 font-[700] uppercase tracking-[0.15em] mb-1">Streak</div>
              <div className="text-[30px] font-[800] text-white leading-none tracking-tight">{currentStreak}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/35 font-[700] uppercase tracking-[0.15em] mb-1">Best</div>
              <div className="text-[30px] font-[800] text-white leading-none tracking-tight">{bestStreak}</div>
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
      className={`w-full backdrop-blur-xl rounded-[24px] p-4 border shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] transition-all text-left flex items-center justify-between group hover:scale-[1.02] active:scale-[0.98] ${
        danger
          ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20'
          : 'bg-white/5 border-white/10 hover:bg-white/10'
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-11 h-11 rounded-[16px] shadow-[inset_0_1px_rgba(255,255,255,0.2)] border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${
          danger ? 'bg-red-500/10 text-red-400 border-red-500/20 drop-shadow-[0_0_5px_rgba(248,113,113,0.4)]' : 'bg-white/5 text-white/80 border-white/10'
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
