import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We don't need a database schema for the proxy application,
// but we'll keep the user schema for consistency with the template

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Add proxy-specific schema if needed in the future
export const proxyRequestSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export type ProxyRequest = z.infer<typeof proxyRequestSchema>;
