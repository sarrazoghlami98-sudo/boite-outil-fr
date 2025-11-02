import { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, Lightbulb, BookOpen, Pencil, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Flashcard } from '@shared/schema';
import InteractiveSentence from './InteractiveSentence';
import TTSControls from './TTSControls';
import PracticeMCQ from './PracticeMCQ';
import PracticeFillBlank from './PracticeFillBlank';
import PracticeDragDrop from './PracticeDragDrop';
import { markFlashcardCompleted, isFlashcardCompleted } from '@/lib/progress';
import confetti from 'canvas-confetti';

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
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [practiceResults, setPracticeResults] = useState<Record<string, boolean>>({});
  const [confettiShown, setConfettiShown] = useState(false);
  const isCompleted = isFlashcardCompleted(categoryId, flashcard.id);
  const ttsControlsRef = useRef<{ handleSpaceKey: () => void }>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Reset practice state when flashcard changes
  useEffect(() => {
    setPracticeResults({});
    setConfettiShown(false);
    setPracticeCompleted(false);
  }, [flashcard.id]);

  const handlePracticeAnswer = (questionId: string, isCorrect: boolean) => {
    if (!isCorrect) {
      setPracticeResults({});
      setConfettiShown(false);
      return;
    }
    
    const newResults = { ...practiceResults, [questionId]: isCorrect };
    setPracticeResults(newResults);
    
    const allQuestionIds = flashcard.practice.map(q => q.id);
    const allCorrect = allQuestionIds.every(id => newResults[id] === true);
    
    if (allCorrect && !confettiShown && allQuestionIds.length === Object.keys(newResults).length) {
      setConfettiShown(true);
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 }
        });
      }, 300);
    }
  };

  const handleMarkComplete = () => {
    setIsMarkingComplete(true);
    timeoutRef.current = setTimeout(() => {
      markFlashcardCompleted(categoryId, flashcard.id);
      setPracticeCompleted(true);
      setIsMarkingComplete(false);
    }, 300);
  };

  const fullText = [
    flashcard.rule,
    ...flashcard.examples.map(ex => ex.sentence)
  ].join('. ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-[90vw] h-[90vh] bg-background rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header - Sticky */}
        <div className="sticky top-0 z-10 bg-card border-b border-border">
          <div className="flex items-center justify-between p-4 md:p-6">
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
              <div className="text-center flex-1">
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
          
          {/* Legend text */}
          <div className="px-4 md:px-6 pb-4 text-sm text-muted-foreground italic flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span>Clique sur les mots soulignés pour voir les remplacements</span>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8">
          {/* Rule Section */}
          <Card className="p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>Règle</span>
            </h3>
            <p className="text-base md:text-lg leading-snug text-foreground">
              {flashcard.rule}
            </p>
            
            <Collapsible open={isDiscoverOpen} onOpenChange={setIsDiscoverOpen} className="mt-4">
              <CollapsibleTrigger 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-discover-toggle"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isDiscoverOpen ? 'rotate-180' : ''}`} />
                <span>Découvrir</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3 p-3 bg-background/50 rounded-md border border-border">
                <p className="text-sm text-muted-foreground italic" data-testid="text-discover-content">
                  Astuce: Pratique régulièrement pour maîtriser cette règle!
                </p>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Examples Section */}
          {flashcard.examples.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground flex items-center gap-2">
                <Pencil className="w-5 h-5" />
                <span>Exemples</span>
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
                    categoryId={categoryId}
                  />
                </Card>
              ))}

            </div>
          )}

          {/* Practice Section */}
          {flashcard.practice.length > 0 && (
            <div className="space-y-6">
              <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground flex items-center gap-2">
                <Pencil className="w-5 h-5" />
                <span>Pratique</span>
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
                      onAnswer={handlePracticeAnswer}
                    />
                  )}
                  {question.type === 'fill-blank' && (
                    <PracticeFillBlank
                      question={question.question}
                      correctAnswer={question.correctAnswer as string}
                      explanation={question.explanation}
                      questionId={question.id}
                      onAnswer={handlePracticeAnswer}
                    />
                  )}
                  {question.type === 'drag-drop' && question.options && (
                    <PracticeDragDrop
                      question={question.question}
                      options={question.options}
                      correctAnswer={question.correctAnswer as string[]}
                      explanation={question.explanation}
                      questionId={question.id}
                      onAnswer={handlePracticeAnswer}
                    />
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Sticky */}
        <div className="sticky bottom-0 z-10 border-t border-border bg-card">
          <div className="p-4 md:p-6 space-y-4">
            {/* TTS Controls - Centered */}
            <div className="flex justify-center">
              <TTSControls text={fullText} ref={ttsControlsRef} />
            </div>
            
            {/* Mark Complete Button */}
            {!isCompleted && (
              <Button
                onClick={handleMarkComplete}
                className="w-full"
                size="lg"
                disabled={isMarkingComplete}
                data-testid="button-mark-complete"
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${isMarkingComplete ? 'animate-spin' : ''}`} />
                {isMarkingComplete ? 'En cours...' : 'Marquer comme complété'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
