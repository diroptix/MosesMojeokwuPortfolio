import { type Project, type InsertProject, type Contact, type InsertContact, projects, contacts } from "@shared/schema";
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
}

export const storage = new DatabaseStorage();
