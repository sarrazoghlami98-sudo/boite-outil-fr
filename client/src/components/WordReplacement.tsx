import { useState, useEffect, useRef } from 'react';
import { WordReplacement as WordReplacementType } from '@shared/schema';
import { Button } from '@/components/ui/button';

interface WordReplacementProps {
  text: string;
  replacement: WordReplacementType;
  index: number;
}

export default function WordReplacement({ text, replacement, index }: WordReplacementProps) {
  const [isSwapped, setIsSwapped] = useState(false);
  const restoreButtonRef = useRef<HTMLButtonElement>(null);

  const grammarColors: Record<string, string> = {
    verbe: 'border-grammar-verbe',
    determinant: 'border-grammar-determinant',
    pronom: 'border-grammar-pronom',
    conjonction: 'border-grammar-conjonction',
    adverbe: 'border-grammar-adverbe',
    preposition: 'border-grammar-preposition',
  };

  const colorClass = grammarColors[replacement.grammarType] || 'border-gray-500';

  const handleToggle = () => {
    setIsSwapped(!isSwapped);
  };

  useEffect(() => {
    if (isSwapped && restoreButtonRef.current) {
      restoreButtonRef.current.focus();
    }
  }, [isSwapped]);

  useEffect(() => {
    if (!isSwapped) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setIsSwapped(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSwapped]);

  return (
    <span className="inline-block relative">
      <button
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        className={`border-b-2 border-dotted ${colorClass} cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
          isSwapped ? 'bg-yellow-200 dark:bg-yellow-300 font-semibold px-1 rounded' : ''
        }`}
        data-testid={`button-word-replacement-${index}`}
        aria-label={`Remplacer ${text} par ${replacement.replacement}`}
        aria-expanded={isSwapped}
      >
        {isSwapped ? replacement.replacement : text}
      </button>
      
      {isSwapped && (
        <div
          className="absolute left-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 text-xs whitespace-nowrap border border-border"
          role="tooltip"
        >
          <p className="text-foreground mb-1" data-testid={`text-replacement-hint-${index}`}>
            {replacement.hint}
          </p>
          <Button
            ref={restoreButtonRef}
            size="sm"
            variant="outline"
            onClick={handleToggle}
            className="text-xs h-6"
            data-testid={`button-restore-${index}`}
          >
            Revenir à la phrase
          </Button>
        </div>
      )}
    </span>
  );
}
