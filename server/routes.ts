import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertGraphicDesignSchema, insertTikTokVideoSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/projects", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;

      if (category) {
        const projects = await storage.getProjectsByCategory(category);
        res.json(projects);
      } else {
        const projects = await storage.getAllProjects();
        res.json(projects);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Log contact for notification (can be extended with email service)
      console.log('New contact submission:', {
        name: contact.name,
        email: contact.email,
        message: contact.message.substring(0, 100)
      });
      
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  app.post("/api/projects/sync-vimeo", async (req, res) => {
    try {
      await storage.syncVimeoProjects();
      res.json({ message: "Vimeo projects synced successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to sync Vimeo projects" });
    }
  });

  app.get("/api/graphic-designs", async (req, res) => {
    try {
      const designs = await storage.getAllGraphicDesigns();
      res.json(designs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch graphic designs" });
    }
  });

  app.get("/api/graphic-designs/:id", async (req, res) => {
    try {
      const design = await storage.getGraphicDesign(req.params.id);
      if (!design) {
        res.status(404).json({ error: "Graphic design not found" });
        return;
      }
      res.json(design);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch graphic design" });
    }
  });

  app.post("/api/graphic-designs", async (req, res) => {
    try {
      const validatedData = insertGraphicDesignSchema.parse(req.body);
      const design = await storage.createGraphicDesign(validatedData);
      res.status(201).json(design);
    } catch (error) {
      res.status(400).json({ error: "Invalid graphic design data" });
    }
  });

  app.get("/api/tiktok-videos", async (req, res) => {
    try {
      const videos = await storage.getAllTikTokVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch TikTok videos" });
    }
  });

  app.get("/api/tiktok-videos/:id", async (req, res) => {
    try {
      const video = await storage.getTikTokVideo(req.params.id);
      if (!video) {
        res.status(404).json({ error: "TikTok video not found" });
        return;
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch TikTok video" });
    }
  });

  app.post("/api/tiktok-videos", async (req, res) => {
    try {
      const validatedData = insertTikTokVideoSchema.parse(req.body);
      const video = await storage.createTikTokVideo(validatedData);
      res.status(201).json(video);
    } catch (error) {
      res.status(400).json({ error: "Invalid TikTok video data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}