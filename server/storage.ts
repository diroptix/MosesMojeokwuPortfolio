import { type Project, type InsertProject } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;

  constructor() {
    this.projects = new Map();
    this.seedProjects();
  }

  private seedProjects() {
    const initialProjects: InsertProject[] = [
      {
        title: "Brand Campaign: Urban Odyssey",
        description: "A cinematic exploration of metropolitan landscapes, blending architectural precision with human narrative. Shot on RED Komodo 6K.",
        videoUrl: "https://drive.google.com/uc?export=preview&id=1iJph3-h5_Tl7f58pLHM5T5Pyc9Djel3q",
        client: "Urban Collective",
        role: "Director of Photography",
        year: "2024"
      },
      {
        title: "Product Film: Precision Timepiece",
        description: "Hyperreal macro cinematography showcasing mechanical artistry. Technical showcase of light manipulation and shallow depth techniques.",
        videoUrl: "https://drive.google.com/uc?export=preview&id=1GThhTv-4JvSE9pnl5qSHWZ9cq7LbFVnl",
        client: "Timekeeper Studios",
        role: "Cinematographer",
        year: "2024"
      },
      {
        title: "Fashion Editorial: Monochrome Dreams",
        description: "High-contrast visual narrative merging fashion and fine art. Experimental lighting setups creating sculptural depth.",
        videoUrl: "https://drive.google.com/uc?export=preview&id=15rmwwP0kmqPHN7O7FUIYS6ErY-8cHZjZ",
        client: "Mode Magazine",
        role: "Creative Director",
        year: "2023"
      },
      {
        title: "Documentary Short: Craftsmanship",
        description: "Intimate portrait of artisan workshops, capturing the intersection of tradition and innovation through cinematic lens work.",
        videoUrl: "https://drive.google.com/uc?export=preview&id=1K_kfEB5My5wqD2OVFYMfXnwbLg3yE0Tq",
        client: "Heritage Foundation",
        role: "Director of Photography",
        year: "2023"
      },
      {
        title: "Music Video: Ethereal Soundscapes",
        description: "Abstract visual composition synchronized with electronic music. Pushed boundaries of color grading and motion dynamics.",
        videoUrl: "https://drive.google.com/uc?export=preview&id=1G-A2rP-JLgab3DWLt8QX0G12V07RHpPQ",
        client: "Independent Artist",
        role: "Visual Designer",
        year: "2024"
      },
      {
        title: "Corporate Story: Innovation Lab",
        description: "Brand film showcasing technological advancement through human-centered storytelling and dynamic camera movement.",
        videoUrl: "https://vimeo.com/76979871",
        client: "TechForward Inc",
        role: "Cinematographer",
        year: "2023"
      },
      {
        title: "Commercial: Automotive Elegance",
        description: "Luxury vehicle showcase emphasizing design language through strategic lighting and precise camera choreography.",
        videoUrl: "https://vimeo.com/148751763",
        client: "Premium Motors",
        role: "Director of Photography",
        year: "2024"
      }
    ];

    initialProjects.forEach(project => {
      const id = randomUUID();
      this.projects.set(id, { ...project, id });
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
}

export const storage = new MemStorage();
