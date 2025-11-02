import { z } from "zod";

// Grammar category types for word replacements
export type GrammarCategory = 'verbe' | 'determinant' | 'pronom' | 'conjonction' | 'adverbe' | 'preposition';

// Word replacement pair schema
export const wordReplacementSchema = z.object({
  original: z.string(),
  replacement: z.string(),
  hint: z.string(),
  grammarType: z.enum(['verbe', 'determinant', 'pronom', 'conjonction', 'adverbe', 'preposition']),
});

export type WordReplacement = z.infer<typeof wordReplacementSchema>;

// Example in a flashcard
export const exampleSchema = z.object({
  id: z.string(),
  sentence: z.string(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  replacements: z.array(wordReplacementSchema).optional(),
});

export type Example = z.infer<typeof exampleSchema>;

// Practice question types
export const practiceQuestionSchema = z.object({
  id: z.string(),
  type: z.enum(['mcq', 'fill-blank', 'drag-drop']),
  question: z.string(),
  options: z.array(z.string()).optional(), // For MCQ and drag-drop
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string().optional(),
});

export type PracticeQuestion = z.infer<typeof practiceQuestionSchema>;

// Flashcard schema
export const flashcardSchema = z.object({
  id: z.string(),
  title: z.string(),
  rule: z.string(),
  examples: z.array(exampleSchema),
  practice: z.array(practiceQuestionSchema),
});

export type Flashcard = z.infer<typeof flashcardSchema>;

// Category schema
export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  flashcards: z.array(flashcardSchema),
});

export type Category = z.infer<typeof categorySchema>;

// Progress tracking
export const progressSchema = z.object({
  categoryId: z.string(),
  flashcardId: z.string(),
  completed: z.boolean(),
  lastVisited: z.string(), // ISO date string
});

export type Progress = z.infer<typeof progressSchema>;

// User progress state
export const userProgressSchema = z.object({
  progress: z.array(progressSchema),
});

export type UserProgress = z.infer<typeof userProgressSchema>;
