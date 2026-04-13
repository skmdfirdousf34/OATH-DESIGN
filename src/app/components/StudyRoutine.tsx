import { useState } from 'react';
import { ArrowLeft, Plus, Clock, Edit2, Trash2, BookOpen, Home as HomeIcon, Users, ChevronRight } from 'lucide-react';

interface StudyRoutineProps {
  onNavigate: (screen: 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview') => void;
}

interface TimeBlock {
  id: string;
  type: 'self-study' | 'coaching' | 'school';
  startTime: string;
  endTime: string;
  subject?: string;
}

export function StudyRoutine({ onNavigate }: StudyRoutineProps) {
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([
    { id: '1', type: 'school', startTime: '08:00', endTime: '14:00' },
    { id: '2', type: 'coaching', startTime: '15:00', endTime: '18:00', subject: 'Physics' },
    { id: '3', type: 'self-study', startTime: '19:00', endTime: '23:00', subject: 'Maths' },
  ]);

  const totalHours = timeBlocks.reduce((total, block) => {
    const start = parseTime(block.startTime);
    const end = parseTime(block.endTime);
    return total + (end - start);
  }, 0);

  const targetHours = 11;

  return (
    <div className="min-h-full pb-20 pt-4">
      {/* Header */}
      <div className="px-5 min-[400px]:px-6 pt-6 md:pt-8 pb-4 md:pb-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.1)] active:scale-90 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-[22px] min-[400px]:text-[26px] font-[800] tracking-[-0.02em] text-white">Routine</h1>
        </div>

        {/* Liquid Glass Thick Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-[32px] p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_rgba(255,255,255,0.15)] relative overflow-hidden group hover:bg-white/10 transition-all duration-300">
          <div className="absolute top-[-30%] left-[-10%] w-[150px] h-[150px] bg-gradient-to-br from-blue-600/40 to-transparent blur-[50px] rounded-full pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <div className="text-[10px] text-white/35 font-[700] uppercase tracking-[0.15em] mb-1">Daily Goals</div>
              <div className="text-[32px] min-[400px]:text-[40px] font-[800] leading-none tracking-[-0.03em] text-white">{totalHours} <span className="text-[18px] min-[400px]:text-[20px] font-[400] text-white/40">h</span></div>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="text-[10px] text-white/35 font-[700] uppercase tracking-[0.15em] mb-1">Target</div>
              <div className="text-[24px] font-[800] text-white/70 tracking-tight">{targetHours}h</div>
            </div>
          </div>
          
          <div className="mt-4 w-full h-[6px] bg-white/10 backdrop-blur-sm rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] relative z-10">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all shadow-[0_0_10px_rgba(168,85,247,0.8)]"
              style={{ width: `${Math.min((totalHours / targetHours) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="mt-3 flex justify-between text-[13px] text-white/60 font-bold tracking-wide relative z-10">
             <span>Progress</span>
             <span>{Math.round((totalHours / targetHours) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Time Blocks */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4 mt-2">
          <h2 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40 pl-1">Today's Schedule</h2>
        </div>

        <div className="space-y-[10px]">
          {timeBlocks.map((block) => (
            <TimeBlockCard
              key={block.id}
              block={block}
              onDelete={() => setTimeBlocks(timeBlocks.filter((b) => b.id !== block.id))}
            />
          ))}
        </div>
        
        <button
          onClick={() => setShowAddBlock(true)}
          className="w-full mt-4 bg-white/5 backdrop-blur-md border border-dashed border-white/20 hover:border-white/40 hover:bg-white/10 active:scale-[0.98] text-white/70 py-4 rounded-[20px] flex items-center justify-center gap-2 transition-all font-semibold text-[15px] drop-shadow-sm"
        >
          <Plus className="w-5 h-5 drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]" />
          Add New Block
        </button>
      </div>

      {/* Recommendations */}
      <div className="px-5 min-[400px]:px-6 mb-6">
        <h2 className="text-[11px] font-[700] tracking-[0.15em] uppercase text-white/40 mb-4 pl-1">Recommended</h2>
        <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-2 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] flex flex-col gap-1">
            <RecommendationItem time="06:00 - 08:00" activity="Morning Self-Study" hours="2h" />
            <div className="h-[1px] bg-white/10 mx-4"></div>
            <RecommendationItem time="08:00 - 14:00" activity="School" hours="6h" />
            <div className="h-[1px] bg-white/10 mx-4"></div>
            <RecommendationItem time="15:00 - 18:00" activity="Coaching Classes" hours="3h" />
            <div className="h-[1px] bg-white/10 mx-4"></div>
            <RecommendationItem time="19:00 - 23:00" activity="Evening Self-Study" hours="4h" />
        </div>
        <div className="mt-4 text-[13px] text-center font-bold uppercase tracking-wider text-white/40 drop-shadow-sm">
          Based on Class 11 profile
        </div>
      </div>

      {/* Add Block Modal */}
      {showAddBlock && (
        <div className="fixed inset-0 bg-black/60 flex items-end z-50 backdrop-blur-md transition-opacity duration-300">
          <div className="w-full bg-black/60 backdrop-blur-2xl rounded-t-[32px] p-6 border-t border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.8),inset_0_1px_rgba(255,255,255,0.2)] pb-10">
            <h3 className="text-2xl font-bold tracking-wide mb-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Add Block</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] text-white/60 font-bold uppercase tracking-wider mb-2 block">Block Type</label>
                <select className="w-full bg-white/5 backdrop-blur-md rounded-[16px] px-4 py-4 text-[15px] text-white border border-white/10 focus:border-white/30 focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none transition-all appearance-none cursor-pointer hover:bg-white/10">
                  <option className="bg-[#1A1A1C] text-white">Self Study</option>
                  <option className="bg-[#1A1A1C] text-white">Coaching</option>
                  <option className="bg-[#1A1A1C] text-white">School</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[13px] text-white/60 font-bold uppercase tracking-wider mb-2 block">Start Time</label>
                  <input
                    type="time"
                    className="w-full bg-white/5 backdrop-blur-md rounded-[16px] px-4 py-4 text-[15px] text-white border border-white/10 focus:border-white/30 focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none transition-all [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-[13px] text-white/60 font-bold uppercase tracking-wider mb-2 block">End Time</label>
                  <input
                    type="time"
                    className="w-full bg-white/5 backdrop-blur-md rounded-[16px] px-4 py-4 text-[15px] text-white border border-white/10 focus:border-white/30 focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="text-[13px] text-white/60 font-bold uppercase tracking-wider mb-2 block">Subject</label>
                <input
                  type="text"
                  placeholder="e.g., Physics"
                  className="w-full bg-white/5 backdrop-blur-md rounded-[16px] px-4 py-4 text-[15px] text-white border border-white/10 focus:border-white/30 focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none placeholder:text-white/30 transition-all"
                />
              </div>
              <div className="flex gap-3 pt-6">
                <button
                  onClick={() => setShowAddBlock(false)}
                  className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 py-4 rounded-full font-bold tracking-wide text-[16px] hover:bg-white/10 active:scale-[0.98] transition-all text-white/80"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddBlock(false)}
                  className="flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-4 rounded-full font-bold tracking-wide text-[16px] text-white shadow-[0_0_20px_rgba(168,85,247,0.4),inset_0_1px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Save Let's Go
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TimeBlockCard({ block, onDelete }: { block: TimeBlock; onDelete: () => void }) {
  
  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'self-study': return <BookOpen className="w-[18px] h-[18px] text-[#0A84FF]" />;
      case 'coaching': return <Users className="w-[18px] h-[18px] text-[#FF453A]" />;
      case 'school': return <HomeIcon className="w-[18px] h-[18px] text-[#30D158]" />;
      default: return <Clock className="w-[18px] h-[18px]" />;
    }
  };

  const duration = parseTime(block.endTime) - parseTime(block.startTime);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-2 pr-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_rgba(255,255,255,0.15)] flex flex-col group hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
      <div className="flex items-center justify-between p-2">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[16px] bg-white/5 backdrop-blur-md shadow-[inset_0_1px_rgba(255,255,255,0.2)] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
               {getBlockIcon(block.type)}
            </div>
            <div className="flex flex-col">
               <span className="font-[700] text-[17px] tracking-tight capitalize text-white">{block.type.replace('-', ' ')}</span>
               {block.subject && <span className="text-[12px] font-normal text-white/40 mt-0.5">{block.subject}</span>}
            </div>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[17px] font-[800] text-white tracking-tight">{duration}h</span>
         </div>
      </div>
      <div className="flex items-center justify-between pl-[72px] pr-2 pb-2">
         <div className="text-[13px] font-bold tracking-wider text-white/40">
           {block.startTime} - {block.endTime}
         </div>
         <div className="flex gap-2 relative z-10">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 hover:scale-110 active:scale-90 transition-all border border-white/5">
              <Edit2 className="w-[14px] h-[14px] text-white/80" />
            </button>
            <button onClick={onDelete} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 hover:bg-red-500/30 hover:scale-110 active:scale-90 transition-all border border-red-500/20">
              <Trash2 className="w-[14px] h-[14px] text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.6)]" />
            </button>
         </div>
      </div>
    </div>
  );
}

function RecommendationItem({ time, activity, hours }: { time: string; activity: string; hours: string }) {
  return (
    <div className="flex items-center justify-between p-4 group cursor-pointer hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] rounded-xl transition-all">
      <div className="flex flex-col gap-0.5">
        <div className="font-[700] text-[15px] text-white tracking-[-0.01em]">{activity}</div>
        <div className="text-[11px] font-normal tracking-wider text-white/40">{time}</div>
      </div>
      <div className="flex items-center gap-3">
         <span className="font-bold text-[15px] text-white/80">{hours}</span>
         <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}

function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours + minutes / 60;
}
