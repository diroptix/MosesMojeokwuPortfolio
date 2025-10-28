import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

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

  const httpServer = createServer(app);

  return httpServer;
}