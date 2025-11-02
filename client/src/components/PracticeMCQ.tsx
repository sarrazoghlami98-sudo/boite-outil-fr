import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface PracticeMCQProps {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  questionId: string;
}

export default function PracticeMCQ({ question, options, correctAnswer, explanation, questionId }: PracticeMCQProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-foreground">{question}</p>
      
      <div className="grid gap-3">
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const showCorrect = showResult && option === correctAnswer;
          const showIncorrect = showResult && isSelected && !isCorrect;
          
          return (
            <button
              key={idx}
              onClick={() => !showResult && setSelectedAnswer(option)}
              disabled={showResult}
              data-testid={`button-mcq-option-${questionId}-${idx}`}
              className={`p-4 rounded-lg border-2 text-left transition-all hover-elevate ${
                isSelected && !showResult
                  ? 'border-primary bg-primary/10'
                  : showCorrect
                  ? 'border-green-500 bg-green-100 dark:bg-green-900/30'
                  : showIncorrect
                  ? 'border-red-500 bg-red-100 dark:bg-red-900/30'
                  : 'border-border bg-card'
              } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{option}</span>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
              </div>
            </button>
          );
        })}
      </div>

      {!showResult ? (
        <Button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="w-full"
          data-testid={`button-submit-mcq-${questionId}`}
        >
          Vérifier
        </Button>
      ) : (
        <div className="space-y-3">
          <div
            className={`p-4 rounded-lg ${
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/30 border border-green-500'
                : 'bg-red-100 dark:bg-red-900/30 border border-red-500'
            }`}
          >
            <p className={`font-semibold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
              {isCorrect ? '✓ Bravo! Bonne réponse!' : '✗ Pas tout à fait...'}
            </p>
            {explanation && (
              <p className="mt-2 text-sm text-foreground">{explanation}</p>
            )}
          </div>
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full"
            data-testid={`button-reset-mcq-${questionId}`}
          >
            Réessayer
          </Button>
        </div>
      )}
    </div>
  );
}
