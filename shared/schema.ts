import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  videoUrl: varchar("video_url", { length: 500 }).notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),
  category: varchar("category", { length: 100 }).notNull().default("brand-campaign"),
  featured: varchar("featured", { length: 10 }).default("false"),
  client: varchar("client", { length: 255 }),
  role: varchar("role", { length: 255 }),
  year: varchar("year", { length: 4 }),
  credits: text("credits"),
  vimeoId: varchar("vimeo_id", { length: 50 }),
  tags: text("tags"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const projectSchema = createInsertSchema(projects);

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export const graphicDesigns = pgTable("graphic_designs", {
  id: varchar("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),
  category: varchar("category", { length: 100 }).default("graphic-design"),
  client: varchar("client", { length: 255 }),
  year: varchar("year", { length: 4 }),
  width: varchar("width", { length: 10 }).default("2700"),
  height: varchar("height", { length: 10 }).default("4050"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGraphicDesignSchema = createInsertSchema(graphicDesigns).omit({
  id: true,
  createdAt: true,
});

export type GraphicDesign = typeof graphicDesigns.$inferSelect;
export type InsertGraphicDesign = z.infer<typeof insertGraphicDesignSchema>;

export const tiktokVideos = pgTable("tiktok_videos", {
  id: varchar("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  videoUrl: varchar("video_url", { length: 500 }).notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),
  width: varchar("width", { length: 10 }).default("1080"),
  height: varchar("height", { length: 10 }).default("1920"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTikTokVideoSchema = createInsertSchema(tiktokVideos).omit({
  id: true,
  createdAt: true,
});

export type TikTokVideo = typeof tiktokVideos.$inferSelect;
export type InsertTikTokVideo = z.infer<typeof insertTikTokVideoSchema>;
