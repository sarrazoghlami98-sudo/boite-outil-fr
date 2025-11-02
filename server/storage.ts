// Database storage implementation using Drizzle ORM
// Blueprint reference: javascript_database, javascript_log_in_with_replit

import {
  users,
  progress,
  streaks,
  badges,
  userBadges,
  assignments,
  type User,
  type UpsertUser,
  type Progress,
  type InsertProgress,
  type Streak,
  type InsertStreak,
  type Badge,
  type InsertBadge,
  type UserBadge,
  type InsertUserBadge,
  type Assignment,
  type InsertAssignment,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Progress operations
  getUserProgress(userId: string): Promise<Progress[]>;
  getProgressByCategory(userId: string, categoryId: string): Promise<Progress[]>;
  markFlashcardCompleted(userId: string, categoryId: string, flashcardId: string): Promise<Progress>;
  
  // Streak operations
  getUserStreak(userId: string): Promise<Streak | undefined>;
  updateStreak(userId: string, lastActivityDate: Date): Promise<Streak>;
  
  // Badge operations
  getAllBadges(): Promise<Badge[]>;
  getUserBadges(userId: string): Promise<UserBadge[]>;
  awardBadge(userId: string, badgeId: string): Promise<UserBadge>;
  
  // Assignment operations
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  getStudentAssignments(studentId: string): Promise<Assignment[]>;
  getTeacherAssignments(assignerId: string): Promise<Assignment[]>;
  markAssignmentCompleted(assignmentId: number): Promise<Assignment>;
}

export class DatabaseStorage implements IStorage {
  // ========== User operations ==========
  
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // ========== Progress operations ==========
  
  async getUserProgress(userId: string): Promise<Progress[]> {
    return await db
      .select()
      .from(progress)
      .where(eq(progress.userId, userId))
      .orderBy(desc(progress.completedAt));
  }

  async getProgressByCategory(userId: string, categoryId: string): Promise<Progress[]> {
    return await db
      .select()
      .from(progress)
      .where(
        and(
          eq(progress.userId, userId),
          eq(progress.categoryId, categoryId)
        )
      );
  }

  async markFlashcardCompleted(
    userId: string,
    categoryId: string,
    flashcardId: string
  ): Promise<Progress> {
    // Check if progress exists
    const existing = await db
      .select()
      .from(progress)
      .where(
        and(
          eq(progress.userId, userId),
          eq(progress.categoryId, categoryId),
          eq(progress.flashcardId, flashcardId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Update existing
      const [updated] = await db
        .update(progress)
        .set({ completed: true, completedAt: new Date() })
        .where(eq(progress.id, existing[0].id))
        .returning();
      return updated;
    } else {
      // Create new
      const [newProgress] = await db
        .insert(progress)
        .values({
          userId,
          categoryId,
          flashcardId,
          completed: true,
          completedAt: new Date(),
        })
        .returning();
      return newProgress;
    }
  }

  // ========== Streak operations ==========
  
  async getUserStreak(userId: string): Promise<Streak | undefined> {
    const [streak] = await db
      .select()
      .from(streaks)
      .where(eq(streaks.userId, userId))
      .limit(1);
    return streak;
  }

  async updateStreak(userId: string, lastActivityDate: Date): Promise<Streak> {
    const existing = await this.getUserStreak(userId);
    
    if (!existing) {
      // Create new streak
      const [newStreak] = await db
        .insert(streaks)
        .values({
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastActivityDate,
        })
        .returning();
      return newStreak;
    }

    // Calculate new streak
    const lastActivity = existing.lastActivityDate;
    const daysDiff = lastActivity 
      ? Math.floor((lastActivityDate.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    let newCurrentStreak = existing.currentStreak;
    
    if (daysDiff === 1) {
      // Consecutive day
      newCurrentStreak = existing.currentStreak + 1;
    } else if (daysDiff > 1) {
      // Streak broken, reset
      newCurrentStreak = 1;
    }
    // If daysDiff === 0 (same day), keep current streak

    const newLongestStreak = Math.max(existing.longestStreak, newCurrentStreak);

    const [updated] = await db
      .update(streaks)
      .set({
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastActivityDate,
      })
      .where(eq(streaks.id, existing.id))
      .returning();

    return updated;
  }

  // ========== Badge operations ==========
  
  async getAllBadges(): Promise<Badge[]> {
    return await db.select().from(badges);
  }

  async getUserBadges(userId: string): Promise<UserBadge[]> {
    return await db
      .select()
      .from(userBadges)
      .where(eq(userBadges.userId, userId))
      .orderBy(desc(userBadges.earnedAt));
  }

  async awardBadge(userId: string, badgeId: string): Promise<UserBadge> {
    // Check if user already has this badge
    const existing = await db
      .select()
      .from(userBadges)
      .where(
        and(
          eq(userBadges.userId, userId),
          eq(userBadges.badgeId, badgeId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    const [newBadge] = await db
      .insert(userBadges)
      .values({ userId, badgeId })
      .returning();
    return newBadge;
  }

  // ========== Assignment operations ==========
  
  async createAssignment(assignment: InsertAssignment): Promise<Assignment> {
    const [newAssignment] = await db
      .insert(assignments)
      .values(assignment)
      .returning();
    return newAssignment;
  }

  async getStudentAssignments(studentId: string): Promise<Assignment[]> {
    return await db
      .select()
      .from(assignments)
      .where(eq(assignments.studentId, studentId))
      .orderBy(desc(assignments.createdAt));
  }

  async getTeacherAssignments(assignerId: string): Promise<Assignment[]> {
    return await db
      .select()
      .from(assignments)
      .where(eq(assignments.assignerId, assignerId))
      .orderBy(desc(assignments.createdAt));
  }

  async markAssignmentCompleted(assignmentId: number): Promise<Assignment> {
    const [updated] = await db
      .update(assignments)
      .set({ completed: true })
      .where(eq(assignments.id, assignmentId))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
