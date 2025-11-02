import { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Flashcard } from '@shared/schema';
import InteractiveSentence from './InteractiveSentence';
import TTSControls from './TTSControls';
import PracticeMCQ from './PracticeMCQ';
import PracticeFillBlank from './PracticeFillBlank';
import PracticeDragDrop from './PracticeDragDrop';
import { markFlashcardCompleted, isFlashcardCompleted } from '@/lib/progress';

interface FlashcardModalProps {
  flashcard: Flashcard;
  categoryId: string;
  totalCards: number;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export default function FlashcardModal({
  flashcard,
  categoryId,
  totalCards,
  currentIndex,
  onClose,
  onNavigate,
}: FlashcardModalProps) {
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const isCompleted = isFlashcardCompleted(categoryId, flashcard.id);
  const ttsControlsRef = useRef<{ handleSpaceKey: () => void }>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keyboard shortcuts when user is interacting with form controls
      const target = e.target as HTMLElement;
      const isInteractiveElement = target.tagName === 'INPUT' || 
                                     target.tagName === 'TEXTAREA' || 
                                     target.tagName === 'SELECT' ||
                                     target.tagName === 'BUTTON' ||
                                     target.getAttribute('role') === 'button' ||
                                     target.isContentEditable;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight' && currentIndex < totalCards - 1) {
        onNavigate('next');
      } else if ((e.key === ' ' || e.key === 'Spacebar') && !isInteractiveElement) {
        // Only handle Space for TTS when not focused on interactive elements
        e.preventDefault();
        ttsControlsRef.current?.handleSpaceKey();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalCards, onClose, onNavigate]);

  const handleMarkComplete = () => {
    markFlashcardCompleted(categoryId, flashcard.id);
    setPracticeCompleted(true);
  };

  const fullText = [
    flashcard.rule,
    ...flashcard.examples.map(ex => ex.sentence)
  ].join('. ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl h-[90vh] bg-background rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-card">
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => currentIndex > 0 && onNavigate('prev')}
              disabled={currentIndex === 0}
              data-testid="button-prev-flashcard"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                {flashcard.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Carte {currentIndex + 1} / {totalCards}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isCompleted && (
              <CheckCircle className="w-6 h-6 text-green-600" data-testid="icon-flashcard-completed" />
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => currentIndex < totalCards - 1 && onNavigate('next')}
              disabled={currentIndex === totalCards - 1}
              data-testid="button-next-flashcard"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8">
          {/* Rule Section */}
          <Card className="p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground mb-3">
              📘 Règle
            </h3>
            <p className="text-base md:text-lg leading-snug text-foreground">
              {flashcard.rule}
            </p>
          </Card>

          {/* Examples Section */}
          {flashcard.examples.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground">
                📝 Exemples
              </h3>
              
              {flashcard.examples.map((example, idx) => (
                <Card key={example.id} className="p-4 md:p-6 shadow-md">
                  {example.imageUrl && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={example.imageUrl}
                        alt={example.imageAlt || `Exemple ${idx + 1}`}
                        className="w-full h-auto"
                        data-testid={`img-example-${idx}`}
                      />
                    </div>
                  )}
                  <InteractiveSentence
                    sentence={example.sentence}
                    replacements={example.replacements}
                  />
                </Card>
              ))}

              {flashcard.examples.some(ex => ex.replacements && ex.replacements.length > 0) && (
                <div className="text-xs text-muted-foreground italic border-l-2 border-primary pl-3">
                  💡 Clique sur les mots soulignés pour tester un remplacement.
                </div>
              )}
            </div>
          )}

          {/* TTS Controls */}
          <div>
            <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground mb-4">
              🔊 Écouter
            </h3>
            <TTSControls text={fullText} ref={ttsControlsRef} />
          </div>

          {/* Practice Section */}
          {flashcard.practice.length > 0 && (
            <div className="space-y-6">
              <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground">
                ✏️ Pratique
              </h3>
              
              {flashcard.practice.map((question) => (
                <Card key={question.id} className="p-6 bg-card border-2 border-card-border">
                  {question.type === 'mcq' && question.options && (
                    <PracticeMCQ
                      question={question.question}
                      options={question.options}
                      correctAnswer={question.correctAnswer as string}
                      explanation={question.explanation}
                      questionId={question.id}
                    />
                  )}
                  {question.type === 'fill-blank' && (
                    <PracticeFillBlank
                      question={question.question}
                      correctAnswer={question.correctAnswer as string}
                      explanation={question.explanation}
                      questionId={question.id}
                    />
                  )}
                  {question.type === 'drag-drop' && question.options && (
                    <PracticeDragDrop
                      question={question.question}
                      options={question.options}
                      correctAnswer={question.correctAnswer as string[]}
                      explanation={question.explanation}
                      questionId={question.id}
                    />
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        {!isCompleted && (
          <div className="p-4 md:p-6 border-t border-border bg-card">
            <Button
              onClick={handleMarkComplete}
              className="w-full"
              size="lg"
              data-testid="button-mark-complete"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Marquer comme complété
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
