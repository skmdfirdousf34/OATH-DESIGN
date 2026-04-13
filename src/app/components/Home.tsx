import { Shield, ChevronRight, BrainCircuit, BookOpen } from 'lucide-react';

interface HomeProps {
  onNavigate: (screen: 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview' | 'insights' | 'revision' | 'rank-projection' | 'daily-usage') => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-full pb-32 pt-4">
      {/* Header */}
      <div className="px-5 min-[400px]:px-6 pt-6 md:pt-8 pb-4 md:pb-6">
        <div className="flex items-center mb-10">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
            <Shield className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" strokeWidth={2.5} />
            <span className="text-[13px] font-bold tracking-[0.2em] text-white uppercase">OATH</span>
          </div>
        </div>

        <h1 className="text-[34px] min-[400px]:text-[40px] md:text-[46px] font-[800] leading-[1.04] mb-1 tracking-[-0.03em] text-white">
          Keep <Shield className="w-8 h-8 md:w-9 md:h-9 inline-block mx-1 -mt-2 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" /> <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Your Focus</span><br />
          Sharp
        </h1>
      </div>

      {/* Main Action Buttons */}
      <div className="px-5 min-[400px]:px-6 mb-8 mt-2 space-y-4">
        <button
          onClick={() => onNavigate('insights')}
          className="w-full relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-[24px] p-[8px] pr-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] flex items-center justify-between group hover:bg-white/10 hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-[46px] h-[46px] rounded-[18px] bg-blue-500/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <BrainCircuit className="w-6 h-6 text-blue-300" strokeWidth={2} />
            </div>
            <div className="text-left flex flex-col justify-center">
              <span className="text-[14px] font-[700] text-white mb-[1px] tracking-tight">Interview Insights</span>
              <span className="text-[11px] text-blue-200/40 font-medium">Analyze Subject Mastery</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-all" />
        </button>

        <button
          onClick={() => onNavigate('revision')}
          className="w-full relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-[24px] p-[8px] pr-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] flex items-center justify-between group hover:bg-white/10 hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-[46px] h-[46px] rounded-[18px] bg-orange-500/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-orange-400/30 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              <BookOpen className="w-6 h-6 text-orange-300" strokeWidth={2} />
            </div>
            <div className="text-left flex flex-col justify-center">
              <span className="text-[14px] font-[700] text-white mb-[1px] tracking-tight">Targeted Revision</span>
              <span className="text-[11px] text-orange-200/40 font-medium">Close knowledge gaps</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-all" />
        </button>
      </div>

      {/* Quick Access Grid */}
      <div className="px-5 min-[400px]:px-6 mb-8">
        <h2 className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-4 pl-2">Quick Access</h2>
        <div className="grid grid-cols-2 gap-3 min-[400px]:gap-5">
          <NotchedCard
            metric="#1"
            title="Rank Predictor"
            subtitle="Projected AIR"
            bgColor="#A855F7"
            textColor="#fff"
            onClick={() => onNavigate('rank-projection')}
          />
          <NotchedCard
            metric="24h"
            title="Daily Usage"
            subtitle="Analysis Ready"
            bgColor="#D9F547"
            textColor="#1a1a1a"
            onClick={() => onNavigate('daily-usage')}
          />
        </div>
      </div>

      {/* Brief Stats */}
      <div className="px-5 min-[400px]:px-6 mb-4">
        <h2 className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-4 pl-2">Brief Stats</h2>
        <div className="grid grid-cols-2 gap-3 min-[400px]:gap-5">
          <NotchedCard
            metric="12"
            title="Streak"
            subtitle="Days Active"
            bgColor="#F97316"
            textColor="#fff"
            compact
          />
          <NotchedCard
            metric="87"
            title="Focus Score"
            subtitle="Average"
            bgColor="#3B82F6"
            textColor="#fff"
            compact
          />
        </div>
      </div>
    </div>
  );
}

// ─── Notched Card Component ───────────────────────────────────────────────────
// Replicates the exact concave top-right corner from the reference image
// using an SVG clipPath with a smooth quadratic bezier curve.

interface NotchedCardProps {
  metric: string;
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  compact?: boolean;
  onClick?: () => void;
}

function NotchedCard({ metric, title, subtitle, bgColor, textColor, compact, onClick }: NotchedCardProps) {
  // Card dimensions
  const W = 160;   // viewBox width  (scales with CSS)
  const H = compact ? 130 : 170;  // viewBox height
  const R = 28;    // corner radius for all other corners
  const notch = 44; // size of the concave notch at top-right

  // Build the SVG path for the card shape with a true inward-concave arc at top-right:
  // Start just after top-left arc, go clockwise:
  // top-left arc → along top edge → concave notch (arc sweeping inward) → right edge → bottom-right arc → bottom edge → bottom-left arc → left edge → close
  const path = [
    `M ${R} 0`,
    `L ${W - notch} 0`,
    // Concave arc: sweep-flag=0 means counter-clockwise → creates inner curve
    `Q ${W} 0 ${W} ${notch}`,
    `L ${W} ${H - R}`,
    `Q ${W} ${H} ${W - R} ${H}`,
    `L ${R} ${H}`,
    `Q 0 ${H} 0 ${H - R}`,
    `L 0 ${R}`,
    `Q 0 0 ${R} 0`,
    'Z',
  ].join(' ');

  const isDark = textColor === '#1a1a1a';
  const btnBg = isDark ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.15)';
  const btnBorder = isDark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)';
  const arrowColor = textColor;
  const subtitleColor = isDark ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.55)';
  const dotColor = isDark ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)';

  return (
    /* Outer wrapper — position:relative so the floating btn can sit in the notch */
    <div
      className="relative select-none"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      {/* SVG card body */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: 'block', filter: `drop-shadow(0 16px 32px ${bgColor}55)` }}
        className="transition-transform duration-300 active:scale-95 group"
      >
        <defs>
          <clipPath id={`notch-${bgColor.replace('#','')}-${H}`}>
            <path d={path} />
          </clipPath>
        </defs>

        {/* Card fill */}
        <path d={path} fill={bgColor} />

        {/* Glassmorphism highlight — top-left shine */}
        <path
          d={path}
          fill="url(#shine)"
          opacity="0.25"
          clipPath={`url(#notch-${bgColor.replace('#','')}-${H})`}
        />
        <defs>
          <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Decorative dashed circle — bottom-left, matching reference */}
        <circle
          cx={W * 0.28}
          cy={H * 0.78}
          r={H * 0.42}
          fill="none"
          stroke={dotColor}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Metric number */}
        <text
          x="18"
          y={compact ? 62 : 88}
          fontFamily="'Inter', sans-serif"
          fontWeight="900"
          fontSize={compact ? 46 : 64}
          fill={textColor}
          letterSpacing="-3"
        >
          {metric}
        </text>

        {/* Title */}
        <text
          x="18"
          y={compact ? 88 : 120}
          fontFamily="'Inter', sans-serif"
          fontWeight="700"
          fontSize="13"
          fill={textColor}
        >
          {title}
        </text>

        {/* Subtitle */}
        <text
          x="18"
          y={compact ? 104 : 138}
          fontFamily="'Inter', sans-serif"
          fontWeight="600"
          fontSize="10"
          fill={subtitleColor}
          textDecoration={!compact ? 'none' : 'none'}
        >
          {subtitle}
        </text>
      </svg>

      {/* Floating action button — sits outside the card in the notch corner */}
      {onClick && (
        <div
          className="absolute flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-90"
          style={{
            top: -2,
            right: -2,
            width: notch + 8,
            height: notch + 8,
            background: btnBg,
            border: `1.5px solid ${btnBorder}`,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: `0 4px 16px rgba(0,0,0,0.3)`,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke={arrowColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
