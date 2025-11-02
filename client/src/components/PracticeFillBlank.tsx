import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, XCircle } from 'lucide-react';

interface PracticeFillBlankProps {
  question: string;
  correctAnswer: string;
  explanation?: string;
  questionId: string;
}

export default function PracticeFillBlank({ question, correctAnswer, explanation, questionId }: PracticeFillBlankProps) {
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setAnswer('');
    setShowResult(false);
  };

  const normalizeText = (text: string) => {
    return text.toLowerCase().trim().replace(/\s+/g, ' ');
  };

  const isCorrect = normalizeText(answer) === normalizeText(correctAnswer);

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-foreground">{question}</p>
      
      <Input
        type="text"
        value={answer}
        onChange={(e) => !showResult && setAnswer(e.target.value)}
        placeholder="Écris ta réponse ici..."
        disabled={showResult}
        className="text-lg px-4 py-3"
        data-testid={`input-fill-blank-${questionId}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && answer && !showResult) {
            handleSubmit();
          }
        }}
      />

      {!showResult ? (
        <Button
          onClick={handleSubmit}
          disabled={!answer}
          className="w-full"
          data-testid={`button-submit-fill-blank-${questionId}`}
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
            <div className="flex items-start gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className={`font-semibold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {isCorrect ? 'Bravo! Bonne réponse!' : 'Pas tout à fait...'}
                </p>
                {!isCorrect && (
                  <p className="mt-1 text-sm text-foreground">
                    La bonne réponse est: <span className="font-semibold">{correctAnswer}</span>
                  </p>
                )}
                {explanation && (
                  <p className="mt-2 text-sm text-foreground">{explanation}</p>
                )}
              </div>
            </div>
          </div>
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full"
            data-testid={`button-reset-fill-blank-${questionId}`}
          >
            Réessayer
          </Button>
        </div>
      )}
    </div>
  );
}
