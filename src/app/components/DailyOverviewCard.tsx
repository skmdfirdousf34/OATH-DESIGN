import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  PenLine,
  Instagram,
  Gamepad2,
  Clock,
  Tv2,
} from 'lucide-react';

/* ─── Types ────────────────────────────────────────────────────── */
interface ActivityCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  hours: number;
  minutes: number;
  color: string;      
  glow: string;       
  accentHex: string;  
}

interface HourlyActivity {
  intensity: number; // 0-100
  categoryId: string; // matches ActivityCategory.id
}

interface DailyOverviewCardProps {
  /** Array of 24 hourly activity objects for the last 24 hours */
  hourlyData?: HourlyActivity[];
  categories?: ActivityCategory[];
}

/* ─── Realistic Sample Data Generation ─────────────────────────── */
const generateRealisticData = (): HourlyActivity[] => {
  const data: HourlyActivity[] = [];
  
  for (let i = 0; i < 24; i++) {
    const hour = (new Date().getHours() - (23 - i) + 24) % 24;
    let intensity = 0;
    let categoryId = 'other';

    // Sleep hours (12 AM - 6 AM)
    if (hour >= 0 && hour <= 6) {
      intensity = Math.random() * 10;
      categoryId = 'other';
    } 
    // Morning Study (7 AM - 12 PM)
    else if (hour >= 7 && hour <= 12) {
      intensity = 40 + Math.random() * 50;
      categoryId = Math.random() > 0.3 ? 'online' : 'offline';
    }
    // Afternoon (1 PM - 5 PM)
    else if (hour >= 13 && hour <= 17) {
      intensity = 20 + Math.random() * 60;
      categoryId = Math.random() > 0.5 ? 'social' : 'offline';
    }
    // Evening (6 PM - 11 PM)
    else {
      intensity = 30 + Math.random() * 70;
      categoryId = Math.random() > 0.4 ? 'online' : 'games';
    }

    data.push({ intensity, categoryId });
  }
  return data;
};

const defaultCategories: ActivityCategory[] = [
  {
    id: 'online',
    label: 'Online Study',
    icon: <BookOpen className="w-[15px] h-[15px]" strokeWidth={2.5} />,
    hours: 5,
    minutes: 20,
    color: 'bg-blue-400',
    glow: '0 0 8px rgba(96,165,250,0.6)',
    accentHex: '#60a5fa',
  },
  {
    id: 'offline',
    label: 'Offline Study',
    icon: <PenLine className="w-[15px] h-[15px]" strokeWidth={2.5} />,
    hours: 4,
    minutes: 45,
    color: 'bg-purple-400',
    glow: '0 0 8px rgba(192,132,252,0.6)',
    accentHex: '#c084fc',
  },
  {
    id: 'social',
    label: 'Social Media',
    icon: <Instagram className="w-[15px] h-[15px]" strokeWidth={2.5} />,
    hours: 1,
    minutes: 30,
    color: 'bg-pink-400',
    glow: '0 0 8px rgba(244,114,182,0.6)',
    accentHex: '#f472b6',
  },
  {
    id: 'games',
    label: 'Games',
    icon: <Gamepad2 className="w-[15px] h-[15px]" strokeWidth={2.5} />,
    hours: 0,
    minutes: 45,
    color: 'bg-orange-400',
    glow: '0 0 8px rgba(251,146,60,0.6)',
    accentHex: '#fb923c',
  },
  {
    id: 'other',
    label: 'Entertainment',
    icon: <Tv2 className="w-[15px] h-[15px]" strokeWidth={2.5} />,
    hours: 0,
    minutes: 50,
    color: 'bg-cyan-400',
    glow: '0 0 8px rgba(34,211,238,0.6)',
    accentHex: '#22d3ee',
  },
];

/* ─── Bar chart ─────────────────────────────────────────────────── */
function HourlyBarChart({ 
  data, 
  categories,
  hoveredCategoryId,
  setHoveredCategoryId,
  activeTooltipIndex,
  setActiveTooltipIndex
}: { 
  data: HourlyActivity[], 
  categories: ActivityCategory[],
  hoveredCategoryId: string | null,
  setHoveredCategoryId: (id: string | null) => void,
  activeTooltipIndex: number | null,
  setActiveTooltipIndex: (idx: number | null) => void
}) {
  const maxVal = Math.max(...data.map(d => d.intensity), 1);
  const labels = ['-24h', '-18h', '-12h', '-6h', 'Now'];
  const labelPositions = [0, 6, 12, 18, 23];

  return (
    <div className="relative">
      {/* Bars container */}
      <div className="flex items-end gap-[2.2px] relative group/chart" style={{ height: 100 }}>
        {data.map((item, i) => {
          const heightPx = Math.max((item.intensity / maxVal) * 80, 4);
          const category = categories.find(c => c.id === item.categoryId);
          const color = category?.accentHex || '#fff';
          const isNow = i === 23;
          
          const isCategoryHighlighted = hoveredCategoryId === item.categoryId;
          const isDimmed = (hoveredCategoryId !== null && !isCategoryHighlighted) || 
                          (activeTooltipIndex !== null && activeTooltipIndex !== i);

          return (
            <div 
              key={i} 
              className="flex-1 flex flex-col items-center justify-end relative transition-all duration-300" 
              style={{ height: 100 }}
              onMouseEnter={() => setActiveTooltipIndex(i)}
              onMouseLeave={() => setActiveTooltipIndex(null)}
            >
              {/* Tooltip */}
              {activeTooltipIndex === i && (
                <div 
                  className="absolute -top-12 z-50 bg-black/90 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-xl flex flex-col items-center pointer-events-none whitespace-nowrap shadow-2xl scale-in-center overflow-hidden"
                  style={{ transform: 'translateX(-50%)', left: '50%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest relative z-10">{category?.label}</span>
                  <span className="text-[14px] font-black text-white relative z-10">{Math.round(item.intensity)}% Activity</span>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 border-r border-b border-white/10 rotate-45"></div>
                </div>
              )}

              {isNow && (
                <div 
                  className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white z-20 shadow-[0_0_10px_#fff]"
                />
              )}
              
              <motion.div
                className="w-full rounded-t-[3px] origin-bottom flex-shrink-0"
                style={{
                  height: heightPx,
                  backgroundColor: isNow ? '#fff' : color,
                  boxShadow: (isNow || isCategoryHighlighted) ? `0 0 15px ${isNow ? '#fff' : color}60` : 'none',
                  opacity: isDimmed ? 0.15 : 1
                }}
                animate={{ 
                  scaleX: activeTooltipIndex === i || isCategoryHighlighted ? 1.4 : 1
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          );
        })}
      </div>

      {/* X axis labels */}
      <div className="relative mt-2 h-4">
        {labelPositions.map((pos, i) => (
          <span
            key={i}
            className={`absolute text-[9px] font-[700] uppercase tracking-wider -translate-x-1/2 transition-colors duration-300 ${i === 4 ? 'text-white' : 'text-white/20'}`}
            style={{ left: `${(pos / 23) * 100}%` }}
          >
            {labels[i]}
          </span>
        ))}
      </div>

      {/* Enhanced Legend */}
      <div className="flex items-center gap-2 mt-5 flex-wrap pb-1">
        {categories.map((item) => (
          <div 
            key={item.id} 
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl transition-all duration-300 cursor-default border border-transparent ${hoveredCategoryId === item.id ? 'bg-white/10 border-white/10 scale-105 shadow-lg' : 'opacity-50 hover:opacity-100'}`}
            onMouseEnter={() => setHoveredCategoryId(item.id)}
            onMouseLeave={() => setHoveredCategoryId(null)}
          >
            <div className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: item.accentHex, boxShadow: `0 0 8px ${item.accentHex}` }} />
            <div className="text-white/60 scale-[0.7] -translate-x-0.5">{item.icon}</div>
            <span className="text-[9px] font-black text-white/50 uppercase tracking-tight">
              {item.label}
            </span>
          </div>
        ))}
        
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5">
             <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse shadow-[0_0_5px_#4ade80]" />
             <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.15em]">Live</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Category row ──────────────────────────────────────────────── */
function CategoryRow({ cat, totalMinutes, index, onHover, isDimmed }: {
  cat: ActivityCategory;
  totalMinutes: number;
  index: number;
  onHover: (id: string | null) => void;
  isDimmed: boolean;
}) {
  const catMinutes = cat.hours * 60 + cat.minutes;
  const pct = Math.round((catMinutes / (24 * 60)) * 100); 
  const timeStr = cat.hours > 0 ? `${cat.hours}h ${cat.minutes}m` : `${cat.minutes}m`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.05 }}
      onMouseEnter={() => onHover(cat.id)}
      onMouseLeave={() => onHover(null)}
      className={`flex items-center gap-3 group transition-all duration-300 ${isDimmed ? 'opacity-30 grayscale-[50%]' : 'opacity-100 hover:scale-[1.02]'}`}
    >
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/[0.05] transition-all group-hover:bg-white/10"
        style={{
          backgroundColor: `${cat.accentHex}10`,
          color: cat.accentHex,
          boxShadow: `inset 0 1px 1px rgba(255,255,255,0.05), ${cat.glow}`,
        }}
      >
        {cat.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-[13px] font-bold text-white/80 tracking-tight truncate">{cat.label}</span>
          <span className="text-[12px] font-black text-white tracking-widest">{timeStr}</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: cat.accentHex, boxShadow: cat.glow }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(pct * 3.5, 100)}%` }} 
            transition={{ delay: 0.4 + index * 0.05, duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main component ────────────────────────────────────────────── */
export function DailyOverviewCard() {
  const [hourlyData] = React.useState<HourlyActivity[]>(() => generateRealisticData());
  const [hoveredCategoryId, setHoveredCategoryId] = React.useState<string | null>(null);
  const [activeTooltipIndex, setActiveTooltipIndex] = React.useState<number | null>(null);
  const categories = defaultCategories;
  
  const totalMinutes = categories.reduce((sum, c) => sum + c.hours * 60 + c.minutes, 0);
  const totalH = Math.floor(totalMinutes / 60);
  const totalM = totalMinutes % 60;

  return (
    <div className="bg-[#050505]/80 backdrop-blur-3xl rounded-[40px] p-7 border border-white/[0.08] shadow-[0_32px_64px_rgba(0,0,0,0.6),inset_0_1px_rgba(255,255,255,0.1)] relative overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/10 blur-[120px] pointer-events-none animate-pulse animation-delay-2000" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-[11px] font-black text-white/30 uppercase tracking-[0.25em] mb-2">Usage Analysis</div>
            <div className="flex items-baseline gap-2">
              <span className="text-[42px] font-black text-white tracking-tighter leading-none">{totalH}h {totalM}m</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-[20px] bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
            <Clock className="w-6 h-6 text-white/40" />
          </div>
        </div>

        <div className="mb-10 px-1">
          <HourlyBarChart 
            data={hourlyData} 
            categories={categories} 
            hoveredCategoryId={hoveredCategoryId}
            setHoveredCategoryId={setHoveredCategoryId}
            activeTooltipIndex={activeTooltipIndex}
            setActiveTooltipIndex={setActiveTooltipIndex}
          />
        </div>

        <div className="space-y-5">
          {categories.map((cat, i) => (
            <CategoryRow 
              key={cat.id} 
              cat={cat} 
              totalMinutes={totalMinutes} 
              index={i} 
              onHover={setHoveredCategoryId}
              isDimmed={hoveredCategoryId !== null && hoveredCategoryId !== cat.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
