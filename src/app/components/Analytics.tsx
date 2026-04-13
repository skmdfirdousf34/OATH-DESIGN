import { ArrowLeft, TrendingUp, Clock, Target, Brain } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface AnalyticsProps {
  onNavigate: (screen: 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview') => void;
}

/* ─── data ─────────────────────────────────────────────────── */
const weeklyData = [
  { day: 'Mon', hours: 10,   target: 11 },
  { day: 'Tue', hours: 11.5, target: 11 },
  { day: 'Wed', hours: 9.5,  target: 11 },
  { day: 'Thu', hours: 12,   target: 11 },
  { day: 'Fri', hours: 10.5, target: 11 },
  { day: 'Sat', hours: 11,   target: 11 },
  { day: 'Sun', hours: 8,    target: 11 },
];

const focusTrend = [
  { week: 'W1', score: 65 },
  { week: 'W2', score: 72 },
  { week: 'W3', score: 78 },
  { week: 'W4', score: 87 },
  { week: 'W5', score: 91 },
  { week: 'W6', score: 83 },
];

const subjectData = [
  { subject: 'Physics',   hours: 28, percentage: 35, color: '#818cf8' },
  { subject: 'Chemistry', hours: 22, percentage: 27, color: '#34d399' },
  { subject: 'Maths',     hours: 30, percentage: 38, color: '#f472b6' },
];

/* ─── helpers ───────────────────────────────────────────────── */
function buildLinePath(
  points: { x: number; y: number }[],
  smooth = true
): string {
  if (points.length < 2) return '';
  if (!smooth) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  }
  // Catmull-Rom → cubic bezier
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

/* ─── LINE CHART ──────────────────────────────────────────────*/
function AnimatedLineChart({
  data,
  color,
  label,
  dotColor,
}: {
  data: { label: string; value: number }[];
  color: string;
  label: string;
  dotColor: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [hovered, setHovered] = useState<null | number>(null);
  const [animated, setAnimated] = useState(false);

  const W = 320, H = 140;
  const PAD = { top: 16, right: 16, bottom: 28, left: 28 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const values = data.map((d) => d.value);
  const minV = Math.min(...values) * 0.92;
  const maxV = Math.max(...values) * 1.05;

  const toXY = (i: number, v: number) => ({
    x: PAD.left + (i / (data.length - 1)) * chartW,
    y: PAD.top + (1 - (v - minV) / (maxV - minV)) * chartH,
  });

  const pts = data.map((d, i) => toXY(i, d.value));
  const linePath = buildLinePath(pts);

  // Animate path draw-on
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)';
        path.style.strokeDashoffset = '0';
        setAnimated(true);
      }, 80);
    });
  }, []);

  // Area fill path
  const areaPath =
    linePath +
    ` L${pts[pts.length - 1].x},${PAD.top + chartH} L${pts[0].x},${PAD.top + chartH} Z`;

  const activeIdx = hovered ?? data.length - 1;
  const activePt  = pts[activeIdx];
  const activeVal = data[activeIdx].value;

  return (
    <div className="relative select-none">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: H }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const mx = ((e.clientX - rect.left) / rect.width) * W - PAD.left;
          const step = chartW / (data.length - 1);
          const idx = Math.max(0, Math.min(data.length - 1, Math.round(mx / step)));
          setHovered(idx);
        }}
        onMouseLeave={() => setHovered(null)}
        onTouchMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const mx = ((e.touches[0].clientX - rect.left) / rect.width) * W - PAD.left;
          const step = chartW / (data.length - 1);
          const idx = Math.max(0, Math.min(data.length - 1, Math.round(mx / step)));
          setHovered(idx);
        }}
        onTouchEnd={() => setHovered(null)}
      >
        <defs>
          <linearGradient id={`area-grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={PAD.left} x2={PAD.left + chartW}
            y1={PAD.top + t * chartH} y2={PAD.top + t * chartH}
            stroke="rgba(255,255,255,0.06)" strokeWidth={1}
          />
        ))}

        {/* X labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={toXY(i, 0).x}
            y={H - 6}
            textAnchor="middle"
            fontSize={9}
            fill="rgba(255,255,255,0.35)"
            fontFamily="inherit"
          >
            {d.label}
          </text>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill={`url(#area-grad-${label})`} />

        {/* Main line */}
        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          style={{ willChange: 'stroke-dashoffset' }}
        />

        {/* Background dots (small) */}
        {animated && pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x} cy={p.y} r={3}
            fill={i === activeIdx ? dotColor : color}
            opacity={i === activeIdx ? 1 : 0.35}
            style={{ transition: 'all 0.2s ease' }}
          />
        ))}

        {/* Crosshair vertical line */}
        {hovered !== null && (
          <line
            x1={activePt.x} x2={activePt.x}
            y1={PAD.top} y2={PAD.top + chartH}
            stroke={color} strokeWidth={1} strokeDasharray="4 3" opacity={0.5}
          />
        )}

        {/* Active dot */}
        {animated && (
          <circle
            cx={activePt.x} cy={activePt.y} r={6}
            fill={dotColor}
            stroke="rgba(0,0,0,0.5)"
            strokeWidth={2}
            filter="url(#glow)"
            style={{ transition: 'cx 0.2s ease, cy 0.2s ease' }}
          />
        )}

        {/* Tooltip bubble */}
        {animated && (
          <g style={{ transition: 'transform 0.2s ease' }}
             transform={`translate(${Math.min(activePt.x + 8, W - 70)},${Math.max(activePt.y - 28, PAD.top)})`}>
            <rect x={0} y={0} width={62} height={22} rx={6}
              fill="rgba(0,0,0,0.75)" stroke={color} strokeWidth={1} />
            <text x={31} y={15} textAnchor="middle" fontSize={10} fill="#fff" fontFamily="inherit" fontWeight="600">
              {label === 'focus' ? `${activeVal}` : `${activeVal}h`}  {data[activeIdx].label}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

/* ─── PILL BAR CHART ──────────────────────────────────────────*/
function AnimatedPillBarChart({
  data,
}: {
  data: { day: string; hours: number; target: number }[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const maxH = Math.max(...data.map((d) => d.hours));
  const BAR_MAX_H = 120; // px

  return (
    <div className="flex items-end justify-between gap-2 px-1" style={{ height: BAR_MAX_H + 36 }}>
      {data.map((d, i) => {
        const pct = d.hours / maxH;
        const barH = pct * BAR_MAX_H;
        const met = d.hours >= d.target;
        const delay = `${i * 60}ms`;

        return (
          <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
            {/* Bar column */}
            <div className="relative flex-1 w-full flex items-end justify-center" style={{ height: BAR_MAX_H }}>
              {/* Track (background pill) */}
              <div
                className="absolute bottom-0 rounded-full w-full"
                style={{
                  height: BAR_MAX_H,
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  maxWidth: 34,
                }}
              />
              {/* Filled pill bar */}
              <div
                className="absolute bottom-0 rounded-full w-full overflow-hidden"
                style={{
                  maxWidth: 34,
                  height: BAR_MAX_H,
                }}
              >
                <div
                  className="absolute bottom-0 w-full rounded-full"
                  style={{
                    height: mounted ? barH : 0,
                    transition: mounted ? `height 0.75s cubic-bezier(0.34,1.56,0.64,1) ${delay}` : 'none',
                    background: met
                      ? 'linear-gradient(to top, #10b981, #34d399)'
                      : 'linear-gradient(to top, #f59e0b, #fbbf24)',
                    boxShadow: met
                      ? '0 0 12px rgba(52,211,153,0.55)'
                      : '0 0 10px rgba(251,191,36,0.45)',
                  }}
                />
              </div>
              {/* Value label above bar */}
              <span
                className="absolute text-[10px] font-bold"
                style={{
                  bottom: barH + 4,
                  color: met ? '#34d399' : '#fbbf24',
                  opacity: mounted ? 1 : 0,
                  transition: `opacity 0.4s ease ${delay}`,
                  textShadow: '0 0 6px rgba(0,0,0,0.8)',
                }}
              >
                {d.hours}h
              </span>
            </div>
            {/* Day label */}
            <span className="text-[10px] font-bold text-white/40 tracking-wide">{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── SUBJECT BARS ────────────────────────────────────────────*/
function SubjectBar({ subject, hours, percentage, color, delay }: {
  subject: string; hours: number; percentage: number; color: string; delay: string;
}) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(t);
  }, [percentage]);
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[14px] font-[700] text-white tracking-tight">{subject}</span>
        <span className="text-[11px] font-normal text-white/40">{hours}h · {percentage}%</span>
      </div>
      <div className="w-full h-2.5 bg-white/8 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}88`,
            transition: `width 0.9s cubic-bezier(0.34,1.2,0.64,1) ${delay}`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── METRIC CARD ─────────────────────────────────────────────*/
function MetricCard({ icon, label, value, change, positive }: {
  icon: React.ReactNode; label: string; value: string; change: string; positive: boolean;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[20px] p-4 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-20 h-20 blur-[30px] rounded-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity ${positive ? 'bg-green-500' : 'bg-gray-500'}`} />
      <div className="flex items-center gap-2 mb-2 text-white/40 relative z-10">
        {icon}
        <span className="text-[10px] font-[700] uppercase tracking-[0.15em]">{label}</span>
      </div>
      <div className="text-[28px] font-[800] mb-0.5 text-white leading-none tracking-tight relative z-10">{value}</div>
      <div className={`text-[11px] font-medium tracking-wide relative z-10 ${positive ? 'text-green-400' : 'text-white/30'}`}>{change}</div>
    </div>
  );
}

/* ─── HEATMAP ─────────────────────────────────────────────────*/
function generateHeatmapData() {
  const data = [];
  for (let week = 0; week < 8; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      const hours = Math.random() * 14;
      weekData.push({ date: `Day ${week * 7 + day + 1}`, hours: hours.toFixed(1), value: hours });
    }
    data.push(weekData);
  }
  return data;
}
function getHeatmapColor(value: number) {
  if (value < 5) return 'rgba(255,255,255,0.04)';
  if (value < 8) return '#134e4a';
  if (value < 10) return '#166534';
  if (value < 12) return '#15803d';
  return '#16a34a';
}

/* ─── MAIN COMPONENT ──────────────────────────────────────────*/
export function Analytics({ onNavigate }: AnalyticsProps) {
  const heatmapData = generateHeatmapData();

  const lineData = focusTrend.map((d) => ({ label: d.week, value: d.score }));

  return (
    <div className="min-h-full pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.1)] active:scale-90 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-[26px] font-[800] tracking-[-0.02em] text-white">Analytics</h1>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <MetricCard icon={<Clock className="w-5 h-5" />}    label="This Week"  value="72.5h"  change="+12%"    positive={true} />
          <MetricCard icon={<Target className="w-5 h-5" />}   label="Focus Score" value="87"    change="+9"      positive={true} />
          <MetricCard icon={<TrendingUp className="w-5 h-5" />} label="Avg. Daily" value="10.4h" change="+1.2h"  positive={true} />
          <MetricCard icon={<Brain className="w-5 h-5" />}    label="Streak"     value="12 days" change="Best: 18" positive={false} />
        </div>
      </div>

      {/* ── WEEKLY PILL BAR CHART ─────────────────────────────── */}
      <div className="px-6 mb-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] relative overflow-hidden group hover:bg-white/10 transition-all duration-300">
          <div className="absolute top-[-30%] right-[-10%] w-[120px] h-[120px] bg-gradient-to-br from-green-600/30 to-transparent blur-[50px] rounded-full pointer-events-none opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40">Weekly Study Hours</h3>
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
                Target met
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                Below
              </span>
            </div>
          </div>
          <AnimatedPillBarChart data={weeklyData} />
        </div>
      </div>

      {/* ── FOCUS SCORE LINE CHART ────────────────────────────── */}
      <div className="px-6 mb-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] relative overflow-hidden group hover:bg-white/10 transition-all duration-300">
          <div className="absolute top-[-30%] left-[-10%] w-[120px] h-[120px] bg-gradient-to-br from-purple-600/30 to-transparent blur-[50px] rounded-full pointer-events-none opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <h3 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40 mb-4">Focus Score Trend</h3>
          <AnimatedLineChart
            data={lineData}
            color="#a855f7"
            dotColor="#d946ef"
            label="focus"
          />
        </div>
      </div>

      {/* ── SUBJECT DISTRIBUTION ─────────────────────────────── */}
      <div className="px-6 mb-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] relative overflow-hidden group hover:bg-white/10 transition-all duration-300">
          <div className="absolute bottom-[-30%] right-[-10%] w-[120px] h-[120px] bg-gradient-to-br from-blue-600/30 to-transparent blur-[50px] rounded-full pointer-events-none opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <h3 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40 mb-5">Subject Distribution</h3>
          <div className="space-y-5">
            {subjectData.map((s, i) => (
              <SubjectBar
                key={s.subject}
                subject={s.subject}
                hours={s.hours}
                percentage={s.percentage}
                color={s.color}
                delay={`${i * 150}ms`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── DISCIPLINE HEATMAP ───────────────────────────────── */}
      <div className="px-6 mb-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/3 to-transparent pointer-events-none" />
          <h3 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40 mb-4">Discipline Heatmap</h3>
          <div className="space-y-2">
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex gap-2">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className="flex-1 h-8 rounded-lg transition-all hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: getHeatmapColor(day.value) }}
                    title={`${day.hours}h — ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 text-[10px] text-white/40 font-bold tracking-wider">
            <span>LESS</span>
            <div className="flex gap-1">
              {['rgba(255,255,255,0.05)', '#134e4a', '#166534', '#15803d', '#16a34a'].map((c, i) => (
                <div key={i} className="w-4 h-4 rounded" style={{ backgroundColor: c, boxShadow: i === 4 ? '0 0 6px rgba(22,163,74,0.8)' : 'none' }} />
              ))}
            </div>
            <span>MORE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
