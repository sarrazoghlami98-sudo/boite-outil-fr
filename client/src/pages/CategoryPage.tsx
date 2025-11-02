import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { categories } from '@shared/content-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FlashcardModal from '@/components/FlashcardModal';
import { isFlashcardCompleted } from '@/lib/progress';

export default function CategoryPage() {
  const [, params] = useRoute('/category/:id');
  const categoryId = params?.id;
  const category = categories.find(c => c.id === categoryId);
  
  const [selectedFlashcardIndex, setSelectedFlashcardIndex] = useState<number | null>(null);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Catégorie non trouvée
          </h1>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (selectedFlashcardIndex === null) return;
    
    if (direction === 'prev' && selectedFlashcardIndex > 0) {
      setSelectedFlashcardIndex(selectedFlashcardIndex - 1);
    } else if (direction === 'next' && selectedFlashcardIndex < category.flashcards.length - 1) {
      setSelectedFlashcardIndex(selectedFlashcardIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                {category.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {category.flashcards.length} carte{category.flashcards.length > 1 ? 's' : ''} à explorer
              </p>
            </div>
          </div>
        </div>

        {/* Flashcards Grid */}
        {category.flashcards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
            {category.flashcards.map((flashcard, index) => {
              const completed = isFlashcardCompleted(category.id, flashcard.id);
              
              return (
                <Card
                  key={flashcard.id}
                  className="p-6 hover-elevate active-elevate-2 cursor-pointer transition-all"
                  onClick={() => setSelectedFlashcardIndex(index)}
                  data-testid={`card-flashcard-${index}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display font-semibold text-lg text-foreground pr-2 flex-1">
                      {flashcard.title}
                    </h3>
                    {completed && (
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {flashcard.rule}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{flashcard.examples.length} exemples</span>
                    {flashcard.practice.length > 0 && (
                      <span>{flashcard.practice.length} exercice{flashcard.practice.length > 1 ? 's' : ''}</span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">
              Cette section sera développée bientôt avec plus de contenus!
            </p>
          </Card>
        )}
      </div>

      {/* Flashcard Modal */}
      {selectedFlashcardIndex !== null && (
        <FlashcardModal
          flashcard={category.flashcards[selectedFlashcardIndex]}
          categoryId={category.id}
          totalCards={category.flashcards.length}
          currentIndex={selectedFlashcardIndex}
          onClose={() => setSelectedFlashcardIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
