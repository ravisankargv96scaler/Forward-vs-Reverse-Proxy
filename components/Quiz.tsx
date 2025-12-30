
import React, { useState } from 'react';
import { CheckCircle2, XCircle, Trophy, RefreshCcw, HelpCircle } from 'lucide-react';
import { Question } from '../types';

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Who does a Reverse Proxy primarily protect and act on behalf of?",
    options: ["The Client (User)", "The Internet Service Provider", "The Origin Server", "The Database"],
    correctAnswer: "The Origin Server",
    explanation: "Reverse proxies sit in front of servers to hide their identity, balance load, and improve security."
  },
  {
    id: 2,
    question: "Which of these is a common use case for a Forward Proxy?",
    options: ["Load Balancing traffic to web servers", "Caching database queries", "Anonymizing a user's IP address", "Storing user passwords"],
    correctAnswer: "Anonymizing a user's IP address",
    explanation: "Forward proxies hide the client's IP from the destination, often used for privacy or bypassing filters."
  },
  {
    id: 3,
    question: "You're building a highly scalable website with 5 web servers. Which tool would you place in front of them?",
    options: ["A Reverse Proxy (like Nginx)", "A Forward Proxy (like Squid)", "A VPN Client", "A Local Browser Cache"],
    correctAnswer: "A Reverse Proxy (like Nginx)",
    explanation: "A reverse proxy acts as a load balancer, distributing traffic across your multiple web servers."
  }
];

export const Quiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    const correct = option === QUESTIONS[currentStep].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          <div className="inline-flex items-center justify-center p-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">Quiz Complete!</h2>
            <p className="text-slate-500">You've mastered the basics of proxies.</p>
          </div>
          <div className="text-6xl font-black text-blue-600">
            {score} / {QUESTIONS.length}
          </div>
          <button 
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto px-8 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition-all"
          >
            <RefreshCcw className="w-5 h-5" /> Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[currentStep];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-lg">Check Your Knowledge</span>
        </div>
        <span className="text-sm font-bold text-slate-400">Question {currentStep + 1} of {QUESTIONS.length}</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-8">
        <h3 className="text-xl font-bold leading-tight">{q.question}</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {q.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === q.correctAnswer;
            
            let btnClass = "border-2 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-800/50";
            if (selectedOption) {
              if (isCorrectOption) btnClass = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
              else if (isSelected) btnClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
              else btnClass = "opacity-40 border-slate-100 dark:border-slate-800";
            }

            return (
              <button
                key={idx}
                disabled={!!selectedOption}
                onClick={() => handleOptionSelect(option)}
                className={`p-4 rounded-2xl text-left font-medium transition-all flex items-center justify-between group ${btnClass}`}
              >
                <span>{option}</span>
                {selectedOption && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {selectedOption && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-red-500" />}
              </button>
            );
          })}
        </div>

        {selectedOption && (
          <div className="animate-in slide-in-from-top-4 duration-300 space-y-6">
            <div className={`p-6 rounded-2xl border ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30'}`}>
              <div className="font-bold text-sm mb-2 flex items-center gap-2">
                {isCorrect ? 'Correct!' : 'Knowledge Boost:'}
              </div>
              <p className="text-sm leading-relaxed opacity-80">{q.explanation}</p>
            </div>
            
            <button 
              onClick={nextQuestion}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              {currentStep === QUESTIONS.length - 1 ? 'See Results' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
