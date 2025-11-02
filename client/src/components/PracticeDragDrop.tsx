import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, GripVertical } from 'lucide-react';

interface PracticeDragDropProps {
  question: string;
  options: string[];
  correctAnswer: string[];
  explanation?: string;
  questionId: string;
  onAnswer: (questionId: string, isCorrect: boolean) => void;
}

export default function PracticeDragDrop({
  question,
  options,
  correctAnswer,
  explanation,
  questionId,
  onAnswer
}: PracticeDragDropProps) {
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [availableOptions, setAvailableOptions] = useState<string[]>(options);
  const [showResult, setShowResult] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (item: string, fromAnswer: boolean) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropToAnswer = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (availableOptions.includes(draggedItem)) {
      setAvailableOptions(availableOptions.filter(item => item !== draggedItem));
      if (index !== undefined) {
        const newAnswer = [...userAnswer];
        newAnswer.splice(index, 0, draggedItem);
        setUserAnswer(newAnswer);
      } else {
        setUserAnswer([...userAnswer, draggedItem]);
      }
    } else if (userAnswer.includes(draggedItem)) {
      const oldIndex = userAnswer.indexOf(draggedItem);
      const newAnswer = userAnswer.filter(item => item !== draggedItem);
      if (index !== undefined && index !== oldIndex) {
        newAnswer.splice(index, 0, draggedItem);
      } else {
        newAnswer.push(draggedItem);
      }
      setUserAnswer(newAnswer);
    }
    setDraggedItem(null);
  };

  const handleDropToOptions = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || !userAnswer.includes(draggedItem)) return;

    setUserAnswer(userAnswer.filter(item => item !== draggedItem));
    setAvailableOptions([...availableOptions, draggedItem]);
    setDraggedItem(null);
  };

  const handleClickToAnswer = (item: string) => {
    if (availableOptions.includes(item)) {
      setAvailableOptions(availableOptions.filter(i => i !== item));
      setUserAnswer([...userAnswer, item]);
    }
  };

  const handleClickToOptions = (item: string) => {
    setUserAnswer(userAnswer.filter(i => i !== item));
    setAvailableOptions([...availableOptions, item]);
  };

  const handleSubmit = () => {
    setShowResult(true);
    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
    onAnswer(questionId, isCorrect);
  };

  const handleReset = () => {
    setUserAnswer([]);
    setAvailableOptions(options);
    setShowResult(false);
  };

  const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);

  return (
    <div className="space-y-4" role="group" aria-labelledby={`dragdrop-question-${questionId}`}>
      <p className="text-lg font-medium text-foreground" id={`dragdrop-question-${questionId}`}>{question}</p>

      {/* Drop Zone - User's Answer */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block" id={`answer-zone-label-${questionId}`}>
          Ta réponse:
        </label>
        <div
          className={`min-h-[80px] p-4 rounded-lg border-2 border-dashed transition-colors ${
            showResult
              ? isCorrect
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : 'border-border bg-card hover:border-primary'
          }`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDropToAnswer(e)}
          data-testid={`dropzone-answer-${questionId}`}
          role="region"
          aria-labelledby={`answer-zone-label-${questionId}`}
          aria-describedby={`answer-instructions-${questionId}`}
        >
          {userAnswer.length === 0 ? (
            <p className="text-muted-foreground text-center" id={`answer-instructions-${questionId}`}>
              Glisse les mots ici dans le bon ordre
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {userAnswer.map((item, index) => (
                <div
                  key={`answer-${index}`}
                  draggable={!showResult}
                  onDragStart={() => handleDragStart(item, true)}
                  onClick={() => !showResult && handleClickToOptions(item)}
                  className={`px-4 py-2 rounded-full font-medium shadow-md cursor-move flex items-center gap-2 ${
                    showResult
                      ? 'bg-gray-200 dark:bg-gray-700 cursor-default'
                      : 'bg-primary text-primary-foreground hover-elevate active-elevate-2'
                  }`}
                  data-testid={`answer-item-${questionId}-${index}`}
                  role="button"
                  aria-label={`Mot ${index + 1}: ${item}. ${!showResult ? 'Cliquer pour retirer' : ''}`}
                  tabIndex={showResult ? -1 : 0}
                >
                  {!showResult && <GripVertical className="w-4 h-4 opacity-50" aria-hidden="true" />}
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Available Options */}
      {availableOptions.length > 0 && !showResult && (
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block" id={`options-zone-label-${questionId}`}>
            Options disponibles:
          </label>
          <div
            className="min-h-[60px] p-4 rounded-lg border-2 border-dashed border-border bg-muted/30 flex flex-wrap gap-2"
            onDragOver={handleDragOver}
            onDrop={handleDropToOptions}
            data-testid={`dropzone-options-${questionId}`}
            role="region"
            aria-labelledby={`options-zone-label-${questionId}`}
          >
            {availableOptions.map((item, index) => (
              <div
                key={`option-${index}`}
                draggable
                onDragStart={() => handleDragStart(item, false)}
                onClick={() => handleClickToAnswer(item)}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium shadow cursor-move hover-elevate active-elevate-2 flex items-center gap-2"
                data-testid={`option-item-${questionId}-${index}`}
                role="button"
                aria-label={`Option: ${item}. Cliquer pour ajouter à la réponse`}
                tabIndex={0}
              >
                <GripVertical className="w-4 h-4 opacity-50" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {!showResult ? (
        <Button
          onClick={handleSubmit}
          disabled={userAnswer.length === 0}
          className="w-full"
          data-testid={`button-submit-dragdrop-${questionId}`}
          aria-label="Vérifier l'ordre des mots"
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
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-start gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" aria-label="Correct" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" aria-label="Incorrect" />
              )}
              <div className="flex-1">
                <p className={`font-semibold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {isCorrect ? 'Bravo! Bonne réponse!' : 'Pas tout à fait...'}
                </p>
                {!isCorrect && (
                  <div className="mt-2">
                    <p className="text-sm text-foreground font-medium">La bonne réponse:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {correctAnswer.map((item, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 rounded-full bg-green-200 dark:bg-green-800 text-foreground text-sm font-medium"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
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
            data-testid={`button-reset-dragdrop-${questionId}`}
            aria-label="Réessayer cette question"
          >
            Réessayer
          </Button>
        </div>
      )}
    </div>
  );
}
