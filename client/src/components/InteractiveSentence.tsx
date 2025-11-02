import { WordReplacement as WordReplacementType } from '@shared/schema';
import WordReplacement from './WordReplacement';

interface InteractiveSentenceProps {
  sentence: string;
  replacements?: WordReplacementType[];
  categoryId?: string;
}

export default function InteractiveSentence({ sentence, replacements, categoryId }: InteractiveSentenceProps) {
  if (!replacements || replacements.length === 0) {
    return <div className="text-base md:text-lg leading-snug text-foreground">{sentence}</div>;
  }

  const parts: JSX.Element[] = [];
  let lastIndex = 0;

  replacements.forEach((replacement, idx) => {
    const searchIndex = sentence.indexOf(replacement.original, lastIndex);
    
    if (searchIndex !== -1) {
      if (searchIndex > lastIndex) {
        parts.push(
          <span key={`text-${idx}`}>{sentence.substring(lastIndex, searchIndex)}</span>
        );
      }
      
      parts.push(
        <WordReplacement
          key={`replacement-${idx}`}
          text={replacement.original}
          replacement={replacement}
          index={idx}
          categoryId={categoryId}
        />
      );
      
      lastIndex = searchIndex + replacement.original.length;
    }
  });

  if (lastIndex < sentence.length) {
    parts.push(<span key="text-end">{sentence.substring(lastIndex)}</span>);
  }

  return <div className="text-base md:text-lg leading-snug text-foreground">{parts}</div>;
}
