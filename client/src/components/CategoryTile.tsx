import { Link } from 'wouter';
import { CheckCircle2 } from 'lucide-react';
import { getCategoryProgress } from '@/lib/progress';

interface CategoryTileProps {
  id: string;
  name: string;
  color: string;
  totalCards: number;
}

export default function CategoryTile({ id, name, color, totalCards }: CategoryTileProps) {
  const { completed, total } = getCategoryProgress(id, totalCards);
  const isFullyCompleted = completed === total && total > 0;

  return (
    <Link
      href={`/category/${id}`}
      data-testid={`link-category-${id}`}
    >
      <div
        className="relative h-40 md:h-48 rounded-xl p-6 hover-elevate active-elevate-2 cursor-pointer transition-all duration-150 shadow-lg flex flex-col items-center justify-center text-center group overflow-visible"
        style={{ backgroundColor: color }}
      >
        {isFullyCompleted && (
          <div className="absolute top-3 right-3">
            <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" data-testid={`icon-completed-${id}`} />
          </div>
        )}
        
        <h2 className="font-display font-bold text-lg md:text-xl text-white drop-shadow-md line-clamp-3">
          {name}
        </h2>
        
        {total > 0 && (
          <p className="mt-2 text-sm text-white/90 font-medium" data-testid={`text-progress-${id}`}>
            {completed}/{total} complétées
          </p>
        )}
      </div>
    </Link>
  );
}
