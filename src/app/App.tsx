import { useState } from 'react';
import { Home } from './components/Home';
import { Analytics } from './components/Analytics';
import { StudyRoutine } from './components/StudyRoutine';
import { Profile } from './components/Profile';
import { ActiveSession } from './components/ActiveSession';
import { PostStudyInterview } from './components/PostStudyInterview';
import { Achievements } from './components/Achievements';
import { Insights } from './components/Insights';
import { Revision } from './components/Revision';
import { Distraction } from './components/Distraction';
import { SubPageWrapper } from './components/SubPageWrapper';
import { DailyOverviewCard } from './components/DailyOverviewCard';
import { EtherealShadow } from './components/ui/etheral-shadow';
import { AIRPredictionCard } from './components/AIRPredictionCard';

// Icons for navigation
import { Home as HomeIcon, Calendar, BarChart3, Shield, Lock, Trophy, User } from 'lucide-react';

type ScreenType = 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview' | 'distraction' | 'achievements' | 'insights' | 'revision' | 'rank-projection' | 'daily-usage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [sessionData, setSessionData] = useState<{ subject: string; chapter: string; topic: string } | null>(null);

  const handleEndSession = (data: { subject: string; chapter: string; topic: string }) => {
    setSessionData(data);
    setCurrentScreen('interview');
  };

  const handleInterviewComplete = () => {
    setSessionData(null);
    setCurrentScreen('home');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#080808] sm:bg-[#111111] overflow-hidden sm:p-8">
      {/* iOS Device Frame */}
      <div 
        className="relative w-full h-full sm:w-[390px] sm:h-[844px] bg-[#030303] text-[#F2F2F2] font-sans sm:rounded-[55px] sm:border-[12px] sm:border-black sm:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden shrink-0 transform-gpu flex flex-col"
        style={{ transform: 'translateZ(0)' }}
      >
        
        {/* Dynamic Island (Desktop only) */}
        <div className="hidden sm:flex absolute top-0 w-full justify-center z-[100]">
          <div className="w-[125px] h-[35px] bg-black rounded-b-[24px]"></div>
        </div>

        {/* Ethereal Shadow Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <EtherealShadow
            color="rgba(120, 60, 220, 1)"
            animation={{ scale: 80, speed: 70 }}
            noise={{ opacity: 0.6, scale: 1.5 }}
            sizing="fill"
          />
        </div>
        
        {/* App Content Scroller */}
        <div className="relative z-10 flex-1 w-full overflow-y-auto no-scrollbar scroll-smooth pb-[100px]">
          {currentScreen === 'home' && <Home onNavigate={setCurrentScreen} />}
          {currentScreen === 'analytics' && <Analytics onNavigate={setCurrentScreen} />}
          {currentScreen === 'routine' && <StudyRoutine onNavigate={setCurrentScreen} />}
          {currentScreen === 'profile' && <Profile onNavigate={setCurrentScreen} />}
          {currentScreen === 'session' && <ActiveSession onNavigate={setCurrentScreen} onEndSession={handleEndSession} />}
          {currentScreen === 'interview' && sessionData && (
            <PostStudyInterview
              sessionData={sessionData}
              onNavigate={setCurrentScreen}
              onComplete={handleInterviewComplete}
            />
          )}
          {currentScreen === 'distraction' && <Distraction onNavigate={setCurrentScreen} />}
          {currentScreen === 'achievements' && <Achievements onNavigate={setCurrentScreen} />}
          {currentScreen === 'insights' && <Insights onNavigate={setCurrentScreen} />}
          {currentScreen === 'revision' && <Revision onNavigate={setCurrentScreen} />}
          
          {currentScreen === 'rank-projection' && (
            <SubPageWrapper title="Rank Projection" onBack={() => setCurrentScreen('home')}>
               <AIRPredictionCard />
            </SubPageWrapper>
          )}

          {currentScreen === 'daily-usage' && (
            <SubPageWrapper title="Usage Analysis" onBack={() => setCurrentScreen('home')}>
               <DailyOverviewCard />
            </SubPageWrapper>
          )}
        </div>

        {/* Global Bottom Navigation - Liquid Glass Magnetic Dock */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] bg-black/40 backdrop-blur-2xl px-2 py-3 rounded-[32px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8),inset_0_1px_rgba(255,255,255,0.15)] flex items-center justify-between z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 rounded-[32px] pointer-events-none"></div>

          <button onClick={() => setCurrentScreen('home')} className="p-2 sm:p-2.5 rounded-full transition-all active:scale-90 flex-1 flex justify-center relative z-10 group">
             <div className={`absolute inset-0 rounded-full transition-opacity ${currentScreen === 'home' ? 'bg-white/10 opacity-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'opacity-0 group-hover:bg-white/5'}`}></div>
             <HomeIcon className={`w-5 h-5 relative z-10 ${currentScreen === 'home' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-gray-500'}`} />
          </button>
          
          <button onClick={() => setCurrentScreen('routine')} className="p-2 sm:p-2.5 rounded-full transition-all active:scale-90 flex-1 flex justify-center relative z-10 group">
             <div className={`absolute inset-0 rounded-full transition-opacity ${currentScreen === 'routine' ? 'bg-white/10 opacity-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'opacity-0 group-hover:bg-white/5'}`}></div>
             <Calendar className={`w-5 h-5 relative z-10 ${currentScreen === 'routine' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-gray-500'}`} />
          </button>
          
          <button onClick={() => setCurrentScreen('analytics')} className="p-2 sm:p-2.5 rounded-full transition-all active:scale-90 flex-1 flex justify-center relative z-10 group">
             <div className={`absolute inset-0 rounded-full transition-opacity ${currentScreen === 'analytics' ? 'bg-white/10 opacity-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'opacity-0 group-hover:bg-white/5'}`}></div>
             <BarChart3 className={`w-5 h-5 relative z-10 ${currentScreen === 'analytics' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-gray-500'}`} />
          </button>
          
          {/* Center Main Action - Hover Bouncy */}
          <button onClick={() => setCurrentScreen('session')} className="w-[56px] h-[56px] mx-1 rounded-[22px] bg-gradient-to-br from-white via-white to-gray-400 flex flex-shrink-0 items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_0_20px_rgba(255,255,255,0.3)] -mt-10 border-[4px] border-[#030303] hover:-translate-y-1 active:scale-90 transition-all z-20 relative before:absolute before:inset-[-4px] before:rounded-[26px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:-z-10">
             <Shield className="w-[24px] h-[24px] text-black drop-shadow-md" fill="currentColor" />
          </button>

          <button onClick={() => setCurrentScreen('distraction')} className="p-2 sm:p-2.5 rounded-full transition-all active:scale-90 flex-1 flex justify-center relative z-10 group">
             <div className={`absolute inset-0 rounded-full transition-opacity ${currentScreen === 'distraction' ? 'bg-white/10 opacity-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'opacity-0 group-hover:bg-white/5'}`}></div>
             <Lock className={`w-5 h-5 relative z-10 ${currentScreen === 'distraction' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-gray-500'}`} />
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)] absolute top-[8px] right-[10px] z-20 animate-pulse"></div>
          </button>
          
          <button onClick={() => setCurrentScreen('achievements')} className="p-2 sm:p-2.5 rounded-full transition-all active:scale-90 flex-1 flex justify-center relative z-10 group">
             <div className={`absolute inset-0 rounded-full transition-opacity ${currentScreen === 'achievements' ? 'bg-white/10 opacity-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'opacity-0 group-hover:bg-white/5'}`}></div>
             <Trophy className={`w-5 h-5 relative z-10 ${currentScreen === 'achievements' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-gray-500'}`} />
             <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.8)] absolute top-[8px] right-[10px] z-20"></div>
          </button>
          
          <button onClick={() => setCurrentScreen('profile')} className="p-2 sm:p-2.5 rounded-full transition-all active:scale-90 flex-1 flex justify-center relative z-10 group">
             <div className={`absolute inset-0 rounded-full transition-opacity ${currentScreen === 'profile' ? 'bg-white/10 opacity-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'opacity-0 group-hover:bg-white/5'}`}></div>
             <User className={`w-5 h-5 relative z-10 ${currentScreen === 'profile' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-gray-500'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
