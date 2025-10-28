import { 
  type Project, type InsertProject, 
  type Contact, type InsertContact, 
  type GraphicDesign, type InsertGraphicDesign,
  type TikTokVideo, type InsertTikTokVideo,
  projects, contacts, graphicDesigns, tiktokVideos
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { vimeoService } from "./vimeo";

export interface IStorage {
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  syncVimeoProjects(): Promise<void>;
  projectExists(vimeoId: string): Promise<boolean>;
  getAllGraphicDesigns(): Promise<GraphicDesign[]>;
  getGraphicDesign(id: string): Promise<GraphicDesign | undefined>;
  createGraphicDesign(design: InsertGraphicDesign): Promise<GraphicDesign>;
  getAllTikTokVideos(): Promise<TikTokVideo[]>;
  getTikTokVideo(id: string): Promise<TikTokVideo | undefined>;
  createTikTokVideo(video: InsertTikTokVideo): Promise<TikTokVideo>;
}

export class DatabaseStorage implements IStorage {
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.category, category));
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async syncVimeoProjects(): Promise<void> {
    await vimeoService.syncVideosToProjects(this);
  }

  async projectExists(vimeoId: string): Promise<boolean> {
    const existing = await db.select().from(projects).where(eq(projects.vimeoId, vimeoId));
    return existing.length > 0;
  }

  async getAllGraphicDesigns(): Promise<GraphicDesign[]> {
    return await db.select().from(graphicDesigns);
  }

  async getGraphicDesign(id: string): Promise<GraphicDesign | undefined> {
    const [design] = await db.select().from(graphicDesigns).where(eq(graphicDesigns.id, id));
    return design || undefined;
  }

  async createGraphicDesign(insertDesign: InsertGraphicDesign): Promise<GraphicDesign> {
    const [design] = await db
      .insert(graphicDesigns)
      .values(insertDesign)
      .returning();
    return design;
  }

  async getAllTikTokVideos(): Promise<TikTokVideo[]> {
    return await db.select().from(tiktokVideos);
  }

  async getTikTokVideo(id: string): Promise<TikTokVideo | undefined> {
    const [video] = await db.select().from(tiktokVideos).where(eq(tiktokVideos.id, id));
    return video || undefined;
  }

  async createTikTokVideo(insertVideo: InsertTikTokVideo): Promise<TikTokVideo> {
    const [video] = await db
      .insert(tiktokVideos)
      .values(insertVideo)
      .returning();
    return video;
  }
}

export const storage = new DatabaseStorage();
