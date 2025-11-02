// API routes with Replit Auth integration
// Blueprint reference: javascript_log_in_with_replit

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication middleware
  await setupAuth(app);

  // ========== Auth Routes ==========
  
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user profile (role, grade)
  app.patch('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { role, grade } = req.body;
      
      const user = await storage.upsertUser({
        id: userId,
        role,
        grade,
      });
      
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // ========== Progress Routes ==========
  
  // Get all progress for current user
  app.get('/api/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userProgress = await storage.getUserProgress(userId);
      res.json(userProgress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Get progress by category
  app.get('/api/progress/:categoryId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { categoryId } = req.params;
      const categoryProgress = await storage.getProgressByCategory(userId, categoryId);
      res.json(categoryProgress);
    } catch (error) {
      console.error("Error fetching category progress:", error);
      res.status(500).json({ message: "Failed to fetch category progress" });
    }
  });

  // Mark flashcard as completed
  app.post('/api/progress/complete', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { categoryId, flashcardId } = req.body;
      
      if (!categoryId || !flashcardId) {
        return res.status(400).json({ message: "categoryId and flashcardId are required" });
      }
      
      const progress = await storage.markFlashcardCompleted(userId, categoryId, flashcardId);
      
      // Update streak on completion
      await storage.updateStreak(userId, new Date());
      
      res.json(progress);
    } catch (error) {
      console.error("Error marking flashcard completed:", error);
      res.status(500).json({ message: "Failed to mark flashcard completed" });
    }
  });

  // ========== Streak Routes ==========
  
  app.get('/api/streaks', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const streak = await storage.getUserStreak(userId);
      res.json(streak || { currentStreak: 0, longestStreak: 0 });
    } catch (error) {
      console.error("Error fetching streak:", error);
      res.status(500).json({ message: "Failed to fetch streak" });
    }
  });

  // ========== Badge Routes ==========
  
  app.get('/api/badges', async (req, res) => {
    try {
      const allBadges = await storage.getAllBadges();
      res.json(allBadges);
    } catch (error) {
      console.error("Error fetching badges:", error);
      res.status(500).json({ message: "Failed to fetch badges" });
    }
  });

  app.get('/api/badges/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userBadges = await storage.getUserBadges(userId);
      res.json(userBadges);
    } catch (error) {
      console.error("Error fetching user badges:", error);
      res.status(500).json({ message: "Failed to fetch user badges" });
    }
  });

  app.post('/api/badges/award', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { badgeId } = req.body;
      
      if (!badgeId) {
        return res.status(400).json({ message: "badgeId is required" });
      }
      
      const userBadge = await storage.awardBadge(userId, badgeId);
      res.json(userBadge);
    } catch (error) {
      console.error("Error awarding badge:", error);
      res.status(500).json({ message: "Failed to award badge" });
    }
  });

  // ========== Assignment Routes ==========
  
  // Get assignments for current user (as student)
  app.get('/api/assignments/student', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const assignments = await storage.getStudentAssignments(userId);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching student assignments:", error);
      res.status(500).json({ message: "Failed to fetch student assignments" });
    }
  });

  // Get assignments created by current user (as teacher/parent)
  app.get('/api/assignments/teacher', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || (user.role !== 'teacher' && user.role !== 'parent')) {
        return res.status(403).json({ message: "Only teachers and parents can view this" });
      }
      
      const assignments = await storage.getTeacherAssignments(userId);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching teacher assignments:", error);
      res.status(500).json({ message: "Failed to fetch teacher assignments" });
    }
  });

  // Create new assignment (teachers/parents only)
  app.post('/api/assignments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || (user.role !== 'teacher' && user.role !== 'parent')) {
        return res.status(403).json({ message: "Only teachers and parents can create assignments" });
      }
      
      const { studentId, categoryId, flashcardId, dueDate } = req.body;
      
      if (!studentId || !categoryId) {
        return res.status(400).json({ message: "studentId and categoryId are required" });
      }
      
      const assignment = await storage.createAssignment({
        assignerId: userId,
        studentId,
        categoryId,
        flashcardId,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      });
      
      res.json(assignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ message: "Failed to create assignment" });
    }
  });

  // Mark assignment as completed
  app.patch('/api/assignments/:id/complete', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const assignmentId = parseInt(id, 10);
      
      if (isNaN(assignmentId)) {
        return res.status(400).json({ message: "Invalid assignment ID" });
      }
      
      const assignment = await storage.markAssignmentCompleted(assignmentId);
      res.json(assignment);
    } catch (error) {
      console.error("Error marking assignment completed:", error);
      res.status(500).json({ message: "Failed to mark assignment completed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
