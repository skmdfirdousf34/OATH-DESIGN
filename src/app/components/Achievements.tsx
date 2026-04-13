import { Trophy, Flame, Shield, Award, CheckCircle2 } from 'lucide-react';

interface AchievementsProps {
  onNavigate: (screen: 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview') => void;
}

export function Achievements({ onNavigate }: AchievementsProps) {
  const focusScore = 87;
  const currentStreak = 12;
  const disciplineLevel = 4; // Currently 'Focus Warrior'

  const disciplineLevels = [
    { level: 1, name: 'Distracted Beginner', minScore: 0, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { level: 2, name: 'Focus Trainee', minScore: 30, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { level: 3, name: 'Discipline Builder', minScore: 50, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    { level: 4, name: 'Focus Warrior', minScore: 70, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { level: 5, name: 'Elite Aspirant', minScore: 85, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { level: 6, name: 'IIT Mindset', minScore: 95, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  ];

  const badges = [
    { id: 1, name: '7-Day Warrior', tier: 'Bronze', earned: true, icon: '🥉' },
    { id: 2, name: '14-Day Focus Beast', tier: 'Silver', earned: true, icon: '🥈' },
    { id: 3, name: '30-Day Discipline Master', tier: 'Gold', earned: false, icon: '🥇' },
    { id: 4, name: 'Century Club', tier: 'Platinum', earned: false, icon: '💎' },
  ];

  return (
    <div className="min-h-full pb-32 pt-4">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-[26px] font-[800] leading-none tracking-[-0.02em] text-white">
            Discipline & Glory
          </h1>
        </div>

        {/* Liquid Glass Focus Score Hero Card */}
        <div className="mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-[32px] p-6 border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_rgba(255,255,255,0.2)] relative overflow-hidden group hover:bg-white/10 transition-all duration-300">
            <div className="absolute top-[-40%] right-[-10%] w-[200px] h-[200px] bg-purple-500/30 blur-[70px] rounded-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-[-30%] left-[-10%] w-[150px] h-[150px] bg-blue-500/20 blur-[60px] rounded-full pointer-events-none"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <div className="text-[10px] text-white/35 font-[700] uppercase tracking-[0.15em] mb-2">Focus Score</div>
                <div className="text-[56px] font-[800] leading-none text-white tracking-[-0.04em]">{focusScore}</div>
              </div>
              <div className="w-16 h-16 rounded-[20px] bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[inset_0_1px_rgba(255,255,255,0.2),0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" strokeWidth={2} />
              </div>
            </div>

            <div className="flex items-center gap-8 relative z-10">
              <div className="flex-1">
                <div className="text-[10px] text-white/35 font-[700] uppercase tracking-[0.15em] mb-1 flex items-center gap-1"><Flame className="w-4 h-4 text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.8)]"/> Streak</div>
                <div className="font-[800] text-[22px] text-white tracking-tight">{currentStreak} days</div>
              </div>
              <div className="w-[1px] h-10 bg-white/10"></div>
              <div className="flex-1 pl-4">
                <div className="text-[10px] text-white/35 font-[700] uppercase tracking-[0.15em] mb-1">Rank Level</div>
                <div className="font-[700] text-[17px] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">{disciplineLevels[disciplineLevel - 1].name}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40 pl-1">Milestone Badges</h2>
             <span className="text-[12px] font-bold text-white/40 tracking-wider">{badges.filter(b => b.earned).length}/{badges.length} Earned</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-[24px] p-4 border transition-all hover:scale-[1.03] active:scale-[0.97] duration-300 relative overflow-hidden group ${
                  badge.earned
                    ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 backdrop-blur-xl border-amber-400/30 shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,180,80,0.3)]'
                    : 'bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.1)]'
                }`}
              >
                {badge.earned && <div className="absolute top-[-20%] right-[-20%] w-[80px] h-[80px] bg-amber-400/20 blur-[30px] rounded-full pointer-events-none"></div>}
                <div className={`text-[36px] mb-3 ${!badge.earned && 'grayscale opacity-30'} filter drop-shadow-lg`}>{badge.icon}</div>
                <div className={`text-[14px] font-[700] mb-1 leading-tight tracking-[-0.01em] ${badge.earned ? 'text-white' : 'text-white/30'}`}>{badge.name}</div>
                <div className={`text-[10px] uppercase tracking-[0.15em] font-[700] ${badge.earned ? 'text-amber-300' : 'text-white/20'}`}>
                  {badge.tier}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discipline Progression */}
        <div>
          <h2 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40 mb-4 flex items-center justify-between pl-1">
            Discipline Progression
            <span className="bg-green-400/20 backdrop-blur-md text-green-300 text-[11px] px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-green-400/30 shadow-[0_0_8px_rgba(74,222,128,0.2)]">Level {disciplineLevel}</span>
          </h2>
          <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-2 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] space-y-1">
            {disciplineLevels.map((level) => (
              <div
                key={level.level}
                className={`flex items-center justify-between p-3 rounded-[16px] transition-all hover:scale-[1.01] ${
                  level.level === disciplineLevel
                    ? 'bg-green-400/10 backdrop-blur-md border border-green-400/20 shadow-[inset_0_1px_rgba(74,222,128,0.2)]'
                    : level.level < disciplineLevel
                    ? 'bg-white/[0.03] border border-white/5'
                    : 'bg-transparent border border-transparent opacity-40'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[14px] border ${
                    level.level === disciplineLevel
                      ? 'bg-green-500/20 text-green-300 border-green-400/30 shadow-[0_0_12px_rgba(74,222,128,0.4)]'
                      : level.level < disciplineLevel
                      ? `${level.bg} ${level.color} ${level.border}`
                      : 'bg-white/5 text-white/20 border-white/10'
                  }`}>
                    {level.level < disciplineLevel ? <CheckCircle2 className="w-4 h-4" /> : level.level}
                  </div>
                  <div>
                    <div className={`text-[15px] font-[700] tracking-tight ${
                      level.level === disciplineLevel ? 'text-white' : level.level < disciplineLevel ? 'text-white/60' : 'text-white/20'
                    }`}>{level.name}</div>
                    <div className="text-[10px] font-normal tracking-wider text-white/30 uppercase">Score {level.minScore}+</div>
                  </div>
                </div>
                {level.level === disciplineLevel && (
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,1)] animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
