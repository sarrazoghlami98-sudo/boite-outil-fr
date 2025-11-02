// Hybrid progress tracking: API when logged in, localStorage when not
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { apiRequest } from "@/lib/queryClient";
import * as localProgress from "@/lib/progress";
import type { Progress as DbProgress } from "@shared/schema";

// Convert between database Progress and local Progress types
function dbToLocalProgress(dbProgress: DbProgress[]) {
  return dbProgress.map(p => ({
    categoryId: p.categoryId,
    flashcardId: p.flashcardId,
    completed: p.completed,
    lastVisited: p.completedAt?.toISOString() || p.createdAt?.toISOString() || new Date().toISOString(),
  }));
}

export function useProgress() {
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch progress from API when logged in
  const { data: apiProgress } = useQuery<DbProgress[]>({
    queryKey: ["/api/progress"],
    enabled: isAuthenticated,
  });

  // Get progress (API if logged in, localStorage otherwise)
  const getProgress = () => {
    if (isAuthenticated && apiProgress) {
      return dbToLocalProgress(apiProgress);
    }
    return localProgress.getProgress();
  };

  // Mutation to mark flashcard as completed
  const completeMutation = useMutation({
    mutationFn: async ({ categoryId, flashcardId }: { categoryId: string; flashcardId: string }) => {
      if (isAuthenticated) {
        // Sync to database
        return await apiRequest("/api/progress/complete", {
          method: "POST",
          body: JSON.stringify({ categoryId, flashcardId }),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        // Save to localStorage
        localProgress.markFlashcardCompleted(categoryId, flashcardId);
        return null;
      }
    },
    onSuccess: () => {
      // Invalidate progress cache
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });

  const markFlashcardCompleted = (categoryId: string, flashcardId: string) => {
    return completeMutation.mutateAsync({ categoryId, flashcardId });
  };

  const isFlashcardCompleted = (categoryId: string, flashcardId: string): boolean => {
    const progress = getProgress();
    const card = progress.find(
      p => p.categoryId === categoryId && p.flashcardId === flashcardId
    );
    return card?.completed || false;
  };

  const getCategoryProgress = (categoryId: string, totalCards: number) => {
    const progress = getProgress();
    const completed = progress.filter(
      p => p.categoryId === categoryId && p.completed
    ).length;
    return { completed, total: totalCards };
  };

  return {
    getProgress,
    markFlashcardCompleted,
    isFlashcardCompleted,
    getCategoryProgress,
    isLoading: completeMutation.isPending,
  };
}
