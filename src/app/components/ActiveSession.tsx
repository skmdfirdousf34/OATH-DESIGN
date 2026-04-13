import { useState, useEffect } from 'react';
import { Shield, Lock, Instagram, Youtube, Gamepad2, Film, Globe, CheckCircle2, XCircle, BookOpen } from 'lucide-react';

interface ActiveSessionProps {
  onNavigate: (screen: 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview') => void;
  onEndSession: (data: { subject: string; chapter: string; topic: string }) => void;
}

export function ActiveSession({ onNavigate, onEndSession }: ActiveSessionProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showEndModal, setShowEndModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  const handleEndSession = () => {
    if (subject && chapter && topic) {
      onEndSession({ subject, chapter, topic });
    }
  };

  return (
    <div className="min-h-full pb-20">
      {/* Header */}
      <div className="px-5 min-[400px]:px-6 pt-10 md:pt-12 pb-4 md:pb-6">
        <div className="flex items-center justify-center mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-pulse">
            <Shield className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-2xl min-[400px]:text-3xl font-bold text-center mb-2">Session Active</h1>
        <p className="text-gray-400 text-center text-[13px] min-[400px]:text-sm px-4">
          Distractions are blocked. Stay focused!
        </p>
      </div>

      {/* Timer */}
      <div className="px-5 min-[400px]:px-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-[28px] p-6 min-[400px]:p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-[12px] min-[400px]:text-sm text-white/80 mb-2 uppercase tracking-[0.1em] font-bold">Study Time</div>
            <div className="text-5xl min-[400px]:text-6xl font-bold tracking-tighter mb-4 tabular-nums">{formatTime(elapsedTime)}</div>
            <div className="flex items-center justify-center gap-2 text-[12px] min-[400px]:text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-white/80 font-medium">Recording...</span>
            </div>
          </div>
        </div>
      </div>


      {/* Warning */}
      <div className="px-6 mb-6">
        <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="text-amber-500 mt-0.5">⚠️</div>
            <div>
              <div className="font-medium text-amber-500 mb-1">Important</div>
              <div className="text-sm text-gray-300">
                Blocks will remain active until you complete the post-study interview. Skipping the interview will extend blocking indefinitely.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End Session Button */}
      <div className="px-5 min-[400px]:px-6">
        <button
          onClick={() => setShowEndModal(true)}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl py-4 px-6 font-bold text-[16px] shadow-[0_8px_20px_rgba(16,185,129,0.3)] active:scale-95 transition-all"
        >
          End Session & Take Interview
        </button>
      </div>

      {/* End Session Modal */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/80 flex items-end z-50">
          <div className="w-full bg-[#1a1a1a] rounded-t-3xl p-6 border-t border-gray-800">
            <h3 className="text-xl font-bold mb-2">Session Summary</h3>
            <p className="text-sm text-gray-400 mb-6">
              Tell us what you studied to proceed to the interview
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Physics, Chemistry, Maths"
                  className="w-full bg-[#0a0a0a] rounded-lg px-4 py-3 border border-gray-800 focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Chapter</label>
                <input
                  type="text"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder="e.g., Thermodynamics, Organic Chemistry"
                  className="w-full bg-[#0a0a0a] rounded-lg px-4 py-3 border border-gray-800 focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., First Law of Thermodynamics"
                  className="w-full bg-[#0a0a0a] rounded-lg px-4 py-3 border border-gray-800 focus:border-gray-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3 mb-6">
              <div className="flex gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-300">
                  You'll be asked {Math.floor(Math.random() * 3) + 3} questions about this topic
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEndModal(false)}
                className="flex-1 bg-gray-800 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEndSession}
                disabled={!subject || !chapter || !topic}
                className="flex-1 bg-blue-600 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors disabled:bg-gray-700 disabled:text-gray-500"
              >
                Continue to Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

