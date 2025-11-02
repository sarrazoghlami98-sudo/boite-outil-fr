import { useState, useEffect, useRef } from 'react';
import { WordReplacement as WordReplacementType } from '@shared/schema';
import { Button } from '@/components/ui/button';

interface WordReplacementProps {
  text: string;
  replacement: WordReplacementType;
  index: number;
  categoryId?: string;
}

export default function WordReplacement({ text, replacement, index, categoryId }: WordReplacementProps) {
  const [isSwapped, setIsSwapped] = useState(false);
  const restoreButtonRef = useRef<HTMLButtonElement>(null);

  const grammarStyles: Record<string, { borderColor: string; textColor: string; bgColor: string }> = {
    verbe: { 
      borderColor: 'border-[hsl(var(--grammar-verbe))]', 
      textColor: 'text-[hsl(var(--grammar-verbe))]',
      bgColor: 'bg-[hsl(var(--grammar-verbe)/.1)]'
    },
    determinant: { 
      borderColor: 'border-[hsl(var(--grammar-determinant))]', 
      textColor: 'text-[hsl(var(--grammar-determinant))]',
      bgColor: 'bg-[hsl(var(--grammar-determinant)/.1)]'
    },
    pronom: { 
      borderColor: 'border-[hsl(var(--grammar-pronom))]', 
      textColor: 'text-[hsl(var(--grammar-pronom))]',
      bgColor: 'bg-[hsl(var(--grammar-pronom)/.1)]'
    },
    conjonction: { 
      borderColor: 'border-[hsl(var(--grammar-conjonction))]', 
      textColor: 'text-[hsl(var(--grammar-conjonction))]',
      bgColor: 'bg-[hsl(var(--grammar-conjonction)/.1)]'
    },
    adverbe: { 
      borderColor: 'border-[hsl(var(--grammar-adverbe))]', 
      textColor: 'text-[hsl(var(--grammar-adverbe))]',
      bgColor: 'bg-[hsl(var(--grammar-adverbe)/.1)]'
    },
    preposition: { 
      borderColor: 'border-[hsl(var(--grammar-preposition))]', 
      textColor: 'text-[hsl(var(--grammar-preposition))]',
      bgColor: 'bg-[hsl(var(--grammar-preposition)/.1)]'
    },
  };

  const grammarLabels: Record<string, string> = {
    verbe: "C'est un verbe",
    determinant: "C'est un déterminant",
    pronom: "C'est un pronom",
    conjonction: "C'est une conjonction",
    adverbe: "C'est un adverbe",
    preposition: "C'est une préposition",
  };

  const styles = grammarStyles[replacement.grammarType] || { 
    borderColor: 'border-gray-500', 
    textColor: 'text-gray-500',
    bgColor: 'bg-gray-100'
  };
  const label = grammarLabels[replacement.grammarType] || "C'est un mot";

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

  const isHomophones = categoryId === 'homophones';

  if (isHomophones) {
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
          className={`border-b-2 border-dotted ${styles.borderColor} ${styles.textColor} font-bold cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
            isSwapped ? `${styles.bgColor} px-1 rounded` : ''
          }`}
          data-testid={`button-word-replacement-${index}`}
          aria-label={`Remplacer ${text} par ${replacement.replacement}`}
          aria-expanded={isSwapped}
        >
          {isSwapped ? replacement.replacement : text}
          <span className={`${styles.textColor} ml-1`}>
            ({isSwapped ? text : replacement.replacement})
          </span>
        </button>
        
        {isSwapped && (
          <span
            className="absolute left-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 text-xs whitespace-nowrap border border-border flex flex-col gap-1"
            role="tooltip"
          >
            <span className="text-foreground" data-testid={`text-replacement-hint-${index}`}>
              {replacement.hint}
            </span>
            <span className={`${styles.textColor} font-semibold text-[10px]`} data-testid={`text-grammar-label-${index}`}>
              {label}
            </span>
            <Button
              ref={restoreButtonRef}
              size="sm"
              variant="outline"
              onClick={handleToggle}
              className="mt-1"
              data-testid={`button-restore-${index}`}
            >
              Revenir à la phrase
            </Button>
          </span>
        )}
      </span>
    );
  }

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
        className={`border-b-2 border-dotted ${styles.borderColor} ${styles.textColor} font-bold cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
          isSwapped ? `${styles.bgColor} px-1 rounded` : ''
        }`}
        data-testid={`button-word-replacement-${index}`}
        aria-label={`Remplacer ${text} par ${replacement.replacement}`}
        aria-expanded={isSwapped}
      >
        {isSwapped ? replacement.replacement : text}
      </button>
      
      {isSwapped && (
        <span
          className="absolute left-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 text-xs whitespace-nowrap border border-border flex flex-col gap-1"
          role="tooltip"
        >
          <span className="text-foreground" data-testid={`text-replacement-hint-${index}`}>
            {replacement.hint}
          </span>
          <span className={`${styles.textColor} font-semibold text-[10px]`} data-testid={`text-grammar-label-${index}`}>
            {label}
          </span>
          <Button
            ref={restoreButtonRef}
            size="sm"
            variant="outline"
            onClick={handleToggle}
            className="mt-1"
            data-testid={`button-restore-${index}`}
          >
            Revenir à la phrase
          </Button>
        </span>
      )}
    </span>
  );
}
