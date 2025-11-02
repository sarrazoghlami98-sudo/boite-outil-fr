import { categories } from '@shared/content-data';
import CategoryTile from '@/components/CategoryTile';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
            Ma Boite a outil
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Apprends le français de 6e année avec des exercices interactifs, des règles claires et des exemples illustrés!
          </p>
        </header>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {categories.map((category) => (
            <CategoryTile
              key={category.id}
              id={category.id}
              name={category.name}
              color={category.color}
              totalCards={category.flashcards.length}
            />
          ))}
        </div>

        {/* Keyboard Shortcuts Legend */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-card border border-card-border rounded-lg p-6 shadow-md">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              ⌨️ Raccourcis clavier
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Esc</kbd>
                <span className="text-muted-foreground">Fermer la carte</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">←</kbd>
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">→</kbd>
                <span className="text-muted-foreground">Naviguer</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Space</kbd>
                <span className="text-muted-foreground">Écouter/Pause</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
