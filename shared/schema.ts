import { z } from "zod";
import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  boolean,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// =============================================================================
// DATABASE TABLES (Drizzle ORM)
// =============================================================================

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User roles
export type UserRole = 'student' | 'teacher' | 'parent';

// Users table (mandatory for Replit Auth, extended with role)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").notNull().default('student'), // student | teacher | parent
  grade: integer("grade").default(6), // 5 or 6 for now
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Progress table - tracks flashcard completion per user
export const progress = pgTable("progress", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  categoryId: varchar("category_id").notNull(),
  flashcardId: varchar("flashcard_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_progress_user").on(table.userId),
  index("idx_progress_category").on(table.categoryId),
]);

export type Progress = typeof progress.$inferSelect;
export type InsertProgress = typeof progress.$inferInsert;

// Streaks table - tracks consecutive days of activity
export const streaks = pgTable("streaks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastActivityDate: timestamp("last_activity_date"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_streaks_user").on(table.userId),
]);

export type Streak = typeof streaks.$inferSelect;
export type InsertStreak = typeof streaks.$inferInsert;

// Badges table - defines available badges
export const badges = pgTable("badges", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description").notNull(),
  iconUrl: varchar("icon_url"),
  category: varchar("category").notNull(), // 'completion' | 'streak' | 'mastery' | 'special'
  requirement: jsonb("requirement").notNull(), // Flexible JSON for different badge criteria
  createdAt: timestamp("created_at").defaultNow(),
});

export type Badge = typeof badges.$inferSelect;
export type InsertBadge = typeof badges.$inferInsert;

// User badges table - tracks earned badges
export const userBadges = pgTable("user_badges", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  badgeId: varchar("badge_id").notNull().references(() => badges.id, { onDelete: 'cascade' }),
  earnedAt: timestamp("earned_at").defaultNow(),
}, (table) => [
  index("idx_user_badges_user").on(table.userId),
  index("idx_user_badges_badge").on(table.badgeId),
]);

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = typeof userBadges.$inferInsert;

// Assignments table - teachers/parents assign modules to students
export const assignments = pgTable("assignments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  assignerId: varchar("assigner_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  studentId: varchar("student_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  categoryId: varchar("category_id").notNull(),
  flashcardId: varchar("flashcard_id"), // null = entire category
  dueDate: timestamp("due_date"),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_assignments_student").on(table.studentId),
  index("idx_assignments_assigner").on(table.assignerId),
]);

export type Assignment = typeof assignments.$inferSelect;
export type InsertAssignment = typeof assignments.$inferInsert;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  progress: many(progress),
  streaks: many(streaks),
  badges: many(userBadges),
  assignedTasks: many(assignments, { relationName: 'student_assignments' }),
  createdAssignments: many(assignments, { relationName: 'teacher_assignments' }),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(users, {
    fields: [progress.userId],
    references: [users.id],
  }),
}));

export const streaksRelations = relations(streaks, ({ one }) => ({
  user: one(users, {
    fields: [streaks.userId],
    references: [users.id],
  }),
}));

export const userBadgesRelations = relations(userBadges, ({ one }) => ({
  user: one(users, {
    fields: [userBadges.userId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [userBadges.badgeId],
    references: [badges.id],
  }),
}));

export const badgesRelations = relations(badges, ({ many }) => ({
  userBadges: many(userBadges),
}));

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  assigner: one(users, {
    fields: [assignments.assignerId],
    references: [users.id],
    relationName: 'teacher_assignments',
  }),
  student: one(users, {
    fields: [assignments.studentId],
    references: [users.id],
    relationName: 'student_assignments',
  }),
}));

// =============================================================================
// CONTENT DATA SCHEMAS (Zod - for flashcards, categories, etc.)
// =============================================================================

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
