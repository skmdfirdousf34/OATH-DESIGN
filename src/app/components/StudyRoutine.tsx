import { useState, useMemo } from 'react';
import { ArrowLeft, Plus, BookOpen, Home as HomeIcon, Users, Calendar, ChevronRight, Clock, Target, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudyRoutineProps {
  onNavigate: (screen: string) => void;
}

type DayType = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
type BlockType = 'self-study' | 'coaching' | 'school';

interface TimeBlock {
  id: string;
  day: DayType;
  type: BlockType;
  startTime: string; 
  endTime: string;   
  subject?: string;
}

const DAYS: DayType[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function StudyRoutine({ onNavigate }: StudyRoutineProps) {
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayType>(DAYS[new Date().getDay()]);
  
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([
    { id: '1', day: 'Monday', type: 'school', startTime: '08:00', endTime: '14:00' },
    { id: '2', day: 'Monday', type: 'coaching', startTime: '15:00', endTime: '18:00', subject: 'Physics' },
    { id: '3', day: 'Monday', type: 'self-study', startTime: '19:00', endTime: '23:00', subject: 'Maths' },
    { id: '4', day: 'Tuesday', type: 'school', startTime: '08:00', endTime: '14:00' },
    { id: '5', day: 'Tuesday', type: 'coaching', startTime: '16:00', endTime: '19:00', subject: 'Chemistry' },
    { id: '6', day: 'Wednesday', type: 'school', startTime: '08:00', endTime: '14:00' },
    { id: '7', day: 'Thursday', type: 'school', startTime: '08:00', endTime: '14:00' },
    { id: '8', day: 'Friday', type: 'school', startTime: '08:00', endTime: '14:00' },
  ]);

  // Form State for Adding Block
  const [newBlock, setNewBlock] = useState<{
    day: DayType;
    type: BlockType;
    startTime: string;
    endTime: string;
    subject: string;
  }>({
    day: selectedDay,
    type: 'self-study',
    startTime: '18:00',
    endTime: '20:00',
    subject: '',
  });

  const handleAddBlock = () => {
    if (!newBlock.subject && newBlock.type !== 'school') return;
    
    const blockToAdd: TimeBlock = {
      id: Date.now().toString(),
      ...newBlock,
    };
    
    setTimeBlocks(prev => [...prev, blockToAdd]);
    setShowAddBlock(false);
    setSelectedDay(newBlock.day);
    // Reset form
    setNewBlock({
      day: selectedDay,
      type: 'self-study',
      startTime: '18:00',
      endTime: '20:00',
      subject: '',
    });
  };

  const activeBlocks = useMemo(() => {
    return timeBlocks
      .filter(b => b.day === selectedDay)
      .sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime));
  }, [timeBlocks, selectedDay]);

  return (
    <div className="min-h-full pb-32 bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      {/* Premium Header */}
      <div className="px-6 pt-10 pb-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-xl active:scale-90 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-2xl font-[900] tracking-tight">Routine</h1>
          </div>
          <button
            onClick={() => setShowAddBlock(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-90 transition-all font-bold"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Day Picker Pill Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 relative z-10">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-2.5 rounded-full text-[13px] font-[800] tracking-wide transition-all whitespace-nowrap border ${
                selectedDay === day 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-[0_10px_20px_rgba(37,99,235,0.3)]' 
                  : 'bg-white/5 text-white/30 border-white/5 hover:bg-white/10'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Vertical Schedule */}
      <div className="px-6 pt-6">
        {activeBlocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
             <Calendar className="w-16 h-16 mb-4 stroke-[1]" />
             <p className="text-lg font-bold">No sessions scheduled</p>
             <p className="text-sm">Enjoy your day off!</p>
          </div>
        ) : (
          <div className="space-y-4 relative">
            {/* The Connecting Line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-blue-500/40 via-white/10 to-transparent"></div>

            <AnimatePresence mode="popLayout">
              {activeBlocks.map((block, index) => (
                <RoutineItem key={block.id} block={block} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Recommended Section */}
      <div className="px-6 mt-12">
        <div className="flex items-center gap-2 mb-4">
           <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
           <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30">Suggestions</h2>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-2">
           <RecommendationItem activity="Revision Session" time="1h" type="Self-Study" />
           <div className="h-[1px] bg-white/5 mx-6"></div>
           <RecommendationItem activity="Practice Test" time="2h" type="Coaching" />
        </div>
      </div>

      {/* Functional "Add to Schedule" Modal */}
      <AnimatePresence>
        {showAddBlock && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddBlock(false)}
              className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm"
            />
            
            {/* Modal Drawer */}
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-[101] bg-[#0a0a0a] border-t border-white/10 rounded-t-[40px] px-8 pt-4 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8"></div>
              
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-[900] tracking-tighter">Draft Session</h3>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-white/30 uppercase tracking-widest">{newBlock.startTime} — {newBlock.endTime}</div>
              </div>

              <div className="space-y-6">
                
                {/* 1. Activity Type Segmented Control */}
                <div>
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1 mb-3 block">Activity Type</label>
                   <div className="grid grid-cols-3 gap-2 p-1.5 bg-white/[0.03] border border-white/5 rounded-3xl">
                      {['school', 'coaching', 'self-study'].map((type) => {
                        const isActive = newBlock.type === type;
                        const config = {
                          school: { icon: <HomeIcon className="w-4 h-4" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                          coaching: { icon: <Users className="w-4 h-4" />, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                          'self-study': { icon: <BookOpen className="w-4 h-4" />, color: 'text-blue-400', bg: 'bg-blue-500/10' }
                        }[type as BlockType];
                        
                        return (
                          <button
                            key={type}
                            onClick={() => setNewBlock({ ...newBlock, type: type as BlockType })}
                            className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl transition-all ${isActive ? `${config.bg} ${config.color} border border-white/10 shadow-lg` : 'text-white/20 opacity-50'}`}
                          >
                             {config.icon}
                             <span className="text-[9px] font-black uppercase tracking-widest">{type.split('-')[0]}</span>
                          </button>
                        );
                      })}
                   </div>
                </div>

                {/* 2. Mission / Subject Input */}
                <div className="relative group">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1 mb-2 block">Objective</label>
                   <div className="relative">
                      <Target className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        type="text" 
                        value={newBlock.subject}
                        onChange={(e) => setNewBlock({ ...newBlock, subject: e.target.value })}
                        placeholder="e.g. Physics Revision"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-[17px] font-bold text-white placeholder:text-white/10 outline-none focus:border-blue-500/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                      />
                   </div>
                </div>

                {/* 3. Time Range Picker */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/[0.03] border border-white/5 rounded-[32px] p-5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-2 block">Starts</label>
                      <input 
                        type="time" 
                        value={newBlock.startTime}
                        onChange={(e) => setNewBlock({ ...newBlock, startTime: e.target.value })}
                        className="bg-transparent border-none outline-none text-2xl font-[900] text-white w-full [color-scheme:dark]"
                      />
                   </div>
                   <div className="bg-white/[0.03] border border-white/5 rounded-[32px] p-5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-2 block">Ends</label>
                      <input 
                        type="time" 
                        value={newBlock.endTime}
                        onChange={(e) => setNewBlock({ ...newBlock, endTime: e.target.value })}
                        className="bg-transparent border-none outline-none text-2xl font-[900] text-white w-full [color-scheme:dark]"
                      />
                   </div>
                </div>

                {/* 4. Day Selector */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1 mb-3 block">Apply to Day</label>
                   <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {DAYS.map((day) => (
                      <button
                        key={day}
                        onClick={() => setNewBlock({ ...newBlock, day })}
                        className={`px-5 py-3 rounded-2xl text-[12px] font-black transition-all border ${newBlock.day === day ? 'bg-white text-black border-white' : 'bg-white/5 text-white/20 border-white/5'}`}
                      >
                        {day.substring(0, 3)}
                      </button>
                    ))}
                   </div>
                </div>

                {/* Preview Card */}
                <div className="pt-4">
                   <div className="bg-blue-600 shadow-[0_20px_40px_rgba(37,99,235,0.4)] rounded-[35px] p-1">
                      <button 
                        onClick={handleAddBlock}
                        className="w-full bg-white text-black rounded-[34px] py-6 flex items-center justify-center gap-3 active:scale-95 transition-all group overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <CheckCircle2 className="w-6 h-6 text-blue-600 relative z-10" />
                        <span className="text-[16px] font-[900] uppercase tracking-[0.2em] relative z-10">Deploy Session</span>
                      </button>
                   </div>
                   <button 
                    onClick={() => setShowAddBlock(false)}
                    className="w-full mt-4 py-2 text-white/20 font-bold text-[13px] uppercase tracking-widest"
                   >
                     Discard Draft
                   </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function RoutineItem({ block }: { block: TimeBlock; index: number }) {
  const typeConfig = {
    school: { 
      icon: <HomeIcon className="w-5 h-5" />, 
      color: 'from-emerald-500/20 to-green-500/5', 
      border: 'border-emerald-500/30', 
      text: 'text-emerald-400',
      tag: 'Academic' 
    },
    coaching: { 
      icon: <Users className="w-5 h-5" />, 
      color: 'from-amber-600/20 to-orange-500/5', 
      border: 'border-amber-500/30', 
      text: 'text-amber-400',
      tag: 'Strategic' 
    },
    'self-study': { 
      icon: <BookOpen className="w-5 h-5" />, 
      color: 'from-blue-600/20 to-indigo-500/5', 
      border: 'border-blue-500/30', 
      text: 'text-blue-400',
      tag: 'Growth' 
    }
  }[block.type];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className="flex items-start gap-5 group"
    >
      {/* Time Node */}
      <div className="flex flex-col items-center pt-2 relative z-10">
        <div className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:scale-110 transition-transform`}>
          <span className="text-[14px] font-black tracking-tighter">{block.startTime.split(':')[0]}</span>
        </div>
        <span className="text-[8px] font-black text-white/20 mt-1 uppercase tracking-widest">{parseInt(block.startTime) >= 12 ? 'PM' : 'AM'}</span>
      </div>

      {/* Content Card */}
      <div className={`flex-1 bg-gradient-to-br ${typeConfig.color} border ${typeConfig.border} rounded-[32px] p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group-hover:scale-[1.02] active:scale-[0.98] transition-all duration-300`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] -mr-12 -mt-12 rounded-full"></div>
        
        <div className="flex items-center justify-between mb-4">
           <div className={`flex items-center gap-2 ${typeConfig.text}`}>
              {typeConfig.icon}
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{block.type.replace('-', ' ')}</span>
           </div>
           <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-bold text-white/40">{typeConfig.tag}</span>
        </div>

        <h3 className="text-xl font-[900] text-white tracking-tight leading-tight mb-2">
          {block.subject || 'School Schedule'}
        </h3>

        <div className="flex items-center gap-4 text-white/40">
           <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span className="text-[11px] font-bold">{block.startTime} — {block.endTime}</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function RecommendationItem({ activity, time, type }: { activity: string; time: string; type: string }) {
  return (
    <div className="flex items-center justify-between p-5 hover:bg-white/5 transition-all rounded-2xl cursor-pointer">
       <div className="flex flex-col gap-1">
          <div className="text-[15px] font-[800] text-white tracking-tight">{activity}</div>
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{type}</span>
             <span className="w-1 h-1 rounded-full bg-white/10"></span>
             <span className="text-[10px] font-bold text-white/30">{time} recommended</span>
          </div>
       </div>
       <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
          <ChevronRight className="w-4 h-4 text-white/20" />
       </div>
    </div>
  );
}

function parseTime(time: string): number {
  if (!time) return 0;
  const [h, m] = time.split(':').map(Number);
  return h + m / 60;
}
