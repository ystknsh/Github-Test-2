import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  mulmoScript: jsonb("mulmo_script").notNull(),
  status: text("status").notNull().default("draft"), // draft, generating, completed, error
  outputType: text("output_type").notNull(), // podcast, video, slideshow, pdf
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // podcast, video, presentation, etc.
  mulmoScript: jsonb("mulmo_script").notNull(),
  isPublic: boolean("is_public").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const generations = pgTable("generations", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  status: text("status").notNull().default("pending"), // pending, processing, completed, error
  progress: integer("progress").notNull().default(0),
  outputUrl: text("output_url"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  displayName: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
  mulmoScript: true,
  outputType: true,
});

export const insertTemplateSchema = createInsertSchema(templates).pick({
  name: true,
  description: true,
  category: true,
  mulmoScript: true,
  isPublic: true,
});

export const insertGenerationSchema = createInsertSchema(generations).pick({
  projectId: true,
  status: true,
  progress: true,
  outputUrl: true,
  errorMessage: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;

export type Generation = typeof generations.$inferSelect;
export type InsertGeneration = z.infer<typeof insertGenerationSchema>;

// MulmoScript type definition
export const mulmoScriptSchema = z.object({
  $mulmocast: z.object({
    version: z.string(),
  }),
  speakers: z.array(z.object({
    name: z.string(),
    voice: z.string(),
  })).optional(),
  beats: z.array(z.object({
    text: z.string(),
    speaker: z.string().optional(),
    duration: z.number().optional(),
    image: z.object({
      prompt: z.string().optional(),
      url: z.string().optional(),
    }).optional(),
  })),
});

export type MulmoScript = z.infer<typeof mulmoScriptSchema>;
