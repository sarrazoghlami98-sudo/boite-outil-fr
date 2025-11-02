import { Progress, UserProgress } from '@shared/schema';

const PROGRESS_KEY = 'ma-boite-progress';

export function getProgress(): Progress[] {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (!stored) return [];
    const data: UserProgress = JSON.parse(stored);
    return data.progress;
  } catch {
    return [];
  }
}

export function saveProgress(progress: Progress[]): void {
  const data: UserProgress = { progress };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

export function markFlashcardCompleted(categoryId: string, flashcardId: string): void {
  const progress = getProgress();
  const existing = progress.find(
    p => p.categoryId === categoryId && p.flashcardId === flashcardId
  );
  
  if (existing) {
    existing.completed = true;
    existing.lastVisited = new Date().toISOString();
  } else {
    progress.push({
      categoryId,
      flashcardId,
      completed: true,
      lastVisited: new Date().toISOString()
    });
  }
  
  saveProgress(progress);
}

export function isFlashcardCompleted(categoryId: string, flashcardId: string): boolean {
  const progress = getProgress();
  const card = progress.find(
    p => p.categoryId === categoryId && p.flashcardId === flashcardId
  );
  return card?.completed || false;
}

export function getCategoryProgress(categoryId: string, totalCards: number): {
  completed: number;
  total: number;
} {
  const progress = getProgress();
  const completed = progress.filter(
    p => p.categoryId === categoryId && p.completed
  ).length;
  return { completed, total: totalCards };
}
