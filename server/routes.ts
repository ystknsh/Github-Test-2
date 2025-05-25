import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertProjectSchema, 
  insertTemplateSchema, 
  insertGenerationSchema,
  mulmoScriptSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({ error: "User with this email already exists" });
      }

      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const updates = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(id, updates);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid update data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : 1; // Default to user 1 for demo
      
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const projects = await storage.getProjectsByUser(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const userId = req.body.userId || 1; // Default to user 1 for demo
      
      // Validate MulmoScript
      const validatedScript = mulmoScriptSchema.parse(projectData.mulmoScript);
      
      const project = await storage.createProject({
        ...projectData,
        mulmoScript: validatedScript,
        userId
      });
      
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid project data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const updates = insertProjectSchema.partial().parse(req.body);
      
      // Validate MulmoScript if provided
      if (updates.mulmoScript) {
        updates.mulmoScript = mulmoScriptSchema.parse(updates.mulmoScript);
      }
      
      const project = await storage.updateProject(id, updates);
      
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid update data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const deleted = await storage.deleteProject(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Template routes
  app.get("/api/templates", async (req, res) => {
    try {
      const category = req.query.category as string;
      
      let templates;
      if (category && category !== 'all') {
        templates = await storage.getTemplatesByCategory(category);
      } else {
        templates = await storage.getPublicTemplates();
      }
      
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid template ID" });
      }

      const template = await storage.getTemplate(id);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }

      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch template" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const templateData = insertTemplateSchema.parse(req.body);
      
      // Validate MulmoScript
      const validatedScript = mulmoScriptSchema.parse(templateData.mulmoScript);
      
      const template = await storage.createTemplate({
        ...templateData,
        mulmoScript: validatedScript
      });
      
      res.status(201).json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid template data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create template" });
    }
  });

  // Generation routes
  app.get("/api/generations", async (req, res) => {
    try {
      const projectId = req.query.projectId ? parseInt(req.query.projectId as string) : undefined;
      
      let generations;
      if (projectId) {
        if (isNaN(projectId)) {
          return res.status(400).json({ error: "Invalid project ID" });
        }
        generations = await storage.getGenerationsByProject(projectId);
      } else {
        generations = await storage.getActiveGenerations();
      }
      
      res.json(generations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch generations" });
    }
  });

  app.get("/api/generations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid generation ID" });
      }

      const generation = await storage.getGeneration(id);
      if (!generation) {
        return res.status(404).json({ error: "Generation not found" });
      }

      res.json(generation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch generation" });
    }
  });

  app.post("/api/generations", async (req, res) => {
    try {
      const generationData = insertGenerationSchema.parse(req.body);
      
      // Verify project exists
      const project = await storage.getProject(generationData.projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      const generation = await storage.createGeneration(generationData);
      
      // In a real implementation, this would trigger the actual AI generation process
      // For now, we'll just create the generation record
      
      res.status(201).json(generation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid generation data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create generation" });
    }
  });

  app.put("/api/generations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid generation ID" });
      }

      const updates = insertGenerationSchema.partial().parse(req.body);
      const generation = await storage.updateGeneration(id, updates);
      
      if (!generation) {
        return res.status(404).json({ error: "Generation not found" });
      }

      res.json(generation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid update data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update generation" });
    }
  });

  // MulmoScript validation endpoint
  app.post("/api/mulmo-script/validate", async (req, res) => {
    try {
      const script = mulmoScriptSchema.parse(req.body);
      res.json({ valid: true, script });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          valid: false, 
          error: "Invalid MulmoScript format", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to validate script" });
    }
  });

  // AI Generation endpoint (placeholder for actual AI integration)
  app.post("/api/generate", async (req, res) => {
    try {
      const { projectId, outputType } = req.body;
      
      if (!projectId || !outputType) {
        return res.status(400).json({ error: "Project ID and output type are required" });
      }
      
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      // Create generation record
      const generation = await storage.createGeneration({
        projectId,
        status: "pending",
        progress: 0
      });
      
      // In a real implementation, this would:
      // 1. Queue the generation job
      // 2. Call OpenAI APIs based on the MulmoScript
      // 3. Generate audio/video content
      // 4. Update generation status and progress
      
      // For now, simulate the process
      setTimeout(async () => {
        await storage.updateGeneration(generation.id, {
          status: "processing",
          progress: 50
        });
        
        setTimeout(async () => {
          await storage.updateGeneration(generation.id, {
            status: "completed",
            progress: 100,
            outputUrl: `/api/downloads/${generation.id}.${outputType}`
          });
        }, 5000);
      }, 1000);
      
      res.json({ 
        message: "Generation started",
        generationId: generation.id,
        status: "pending"
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to start generation" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
