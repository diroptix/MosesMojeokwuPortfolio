import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  videoUrl: z.string(),
  client: z.string().optional(),
  role: z.string().optional(),
  year: z.string().optional(),
});

export const insertProjectSchema = projectSchema.omit({ id: true });

export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
