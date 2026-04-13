import { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, Trophy, TrendingDown } from 'lucide-react';

interface PostStudyInterviewProps {
  sessionData: { subject: string; chapter: string; topic: string };
  onNavigate: (screen: 'home' | 'analytics' | 'routine' | 'profile' | 'session' | 'interview') => void;
  onComplete: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export function PostStudyInterview({ sessionData, onNavigate, onComplete }: PostStudyInterviewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showFinalResult, setShowFinalResult] = useState(false);

  // Mock questions based on session data
  const questions: Question[] = [
    {
      id: 1,
      question: `Which fundamental principle is central to ${sessionData.topic}?`,
      options: [
        'Energy can be created and destroyed',
        'Energy cannot be created or destroyed, only converted',
        'Energy is independent of work',
        'Temperature has no relation to energy',
      ],
      correctAnswer: 1,
      explanation: 'The First Law of Thermodynamics states that energy cannot be created or destroyed, only converted from one form to another.',
    },
    {
      id: 2,
      question: `In the context of ${sessionData.topic}, what does ΔU represent?`,
      options: [
        'Change in velocity',
        'Change in internal energy',
        'Change in distance',
        'Change in mass',
      ],
      correctAnswer: 1,
      explanation: 'ΔU represents the change in internal energy of a system.',
    },
    {
      id: 3,
      question: `The equation ΔU = Q - W is associated with which law?`,
      options: [
        'Newton\'s First Law',
        'Second Law of Thermodynamics',
        'First Law of Thermodynamics',
        'Law of Conservation of Momentum',
      ],
      correctAnswer: 2,
      explanation: 'This equation is the mathematical representation of the First Law of Thermodynamics.',
    },
    {
      id: 4,
      question: `If a system does work on its surroundings, what happens to W in the equation ΔU = Q - W?`,
      options: [
        'W is negative',
        'W is positive',
        'W is zero',
        'W is undefined',
      ],
      correctAnswer: 1,
      explanation: 'When a system does work on its surroundings, W is considered positive in the convention ΔU = Q - W.',
    },
  ];

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, isCorrect]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowFinalResult(true);
    }
  };

  const correctCount = answers.filter(Boolean).length;
  const accuracy = Math.round((correctCount / answers.length) * 100);
  const passed = accuracy >= 60;

  if (showFinalResult) {
    return (
      <div className="min-h-full pb-20 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            passed ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {passed ? (
              <Trophy className="w-12 h-12 text-green-500" />
            ) : (
              <TrendingDown className="w-12 h-12 text-red-500" />
            )}
          </div>

          <h1 className="text-3xl font-bold text-center mb-2">
            {passed ? 'Well Done!' : 'Keep Practicing'}
          </h1>
          <p className="text-gray-400 text-center mb-8">
            {passed
              ? 'You demonstrated good understanding of the topic'
              : 'Review the topic again to strengthen your concepts'}
          </p>

          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 mb-6">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-2">{accuracy}%</div>
              <div className="text-sm text-gray-400">Accuracy Score</div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-800">
              <div>
                <div className="text-sm text-gray-400 mb-1">Correct</div>
                <div className="text-2xl font-bold text-green-500">{correctCount}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Wrong</div>
                <div className="text-2xl font-bold text-red-500">{questions.length - correctCount}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 mb-6">
            <div className="text-sm text-gray-400 mb-2">Session Details</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Subject:</span>
                <span className="text-sm font-medium">{sessionData.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Chapter:</span>
                <span className="text-sm font-medium">{sessionData.chapter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Topic:</span>
                <span className="text-sm font-medium">{sessionData.topic}</span>
              </div>
            </div>
          </div>

          {!passed && (
            <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-amber-500 mb-1">Low Performance Alert</div>
                  <div className="text-sm text-gray-300">
                    Multiple low scores may trigger parent/mentor notification. Review your study materials.
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl py-4 px-6 font-semibold hover:from-blue-500 hover:to-purple-500 transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Post-Study Interview</h1>
            <p className="text-sm text-gray-400">{sessionData.topic}</p>
          </div>
          <div className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>

        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 mb-6">
          <div className="text-lg font-semibold leading-relaxed">
            {questions[currentQuestion].question}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={`w-full rounded-xl p-4 border-2 transition-all text-left ${
                showResult
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'border-green-500 bg-green-500/20'
                    : index === selectedAnswer
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-gray-800 bg-[#1a1a1a] opacity-50'
                  : selectedAnswer === index
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-800 bg-[#1a1a1a] hover:border-gray-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  showResult && index === questions[currentQuestion].correctAnswer
                    ? 'border-green-500 bg-green-500'
                    : showResult && index === selectedAnswer
                    ? 'border-red-500 bg-red-500'
                    : selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-600'
                }`}>
                  {showResult && index === questions[currentQuestion].correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                  {showResult && index === selectedAnswer && index !== questions[currentQuestion].correctAnswer && (
                    <XCircle className="w-4 h-4 text-white" />
                  )}
                  {!showResult && selectedAnswer === index && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{option}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showResult && (
        <div className="px-6 mb-6">
          <div className={`rounded-xl p-4 border ${
            selectedAnswer === questions[currentQuestion].correctAnswer
              ? 'bg-green-900/20 border-green-800/30'
              : 'bg-red-900/20 border-red-800/30'
          }`}>
            <div className="flex gap-3">
              {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className={`font-medium mb-1 ${
                  selectedAnswer === questions[currentQuestion].correctAnswer ? 'text-green-500' : 'text-red-500'
                }`}>
                  {selectedAnswer === questions[currentQuestion].correctAnswer ? 'Correct!' : 'Incorrect'}
                </div>
                <div className="text-sm text-gray-300">
                  {questions[currentQuestion].explanation}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-6">
        {!showResult ? (
          <button
            onClick={handleAnswer}
            disabled={selectedAnswer === null}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl py-4 px-6 font-semibold hover:from-blue-500 hover:to-purple-500 transition-all disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl py-4 px-6 font-semibold hover:from-blue-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Warning */}
      <div className="px-6 mt-6">
        <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              Distraction blocking will remain active until you complete this interview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
