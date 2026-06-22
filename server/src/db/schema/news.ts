import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const newsArticlesTable = pgTable("news_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleUrdu: text("title_urdu").default(""),
  titleKn: text("title_kn").default(""),
  excerpt: text("excerpt").notNull().default(""),
  excerptUrdu: text("excerpt_urdu").default(""),
  content: text("content").notNull().default(""),
  tag: text("tag").notNull().default("General"),
  isPublished: boolean("is_published").notNull().default(true),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const noticesTable = pgTable("notices", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleUrdu: text("title_urdu").default(""),
  content: text("content").notNull().default(""),
  tag: text("tag").notNull().default("Notice"),
  isPublished: boolean("is_published").notNull().default(true),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertNewsArticleSchema = createInsertSchema(newsArticlesTable).omit({ id: true, createdAt: true, updatedAt: true });
export const selectNewsArticleSchema = createSelectSchema(newsArticlesTable);
export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;
export type NewsArticle = typeof newsArticlesTable.$inferSelect;

export const insertNoticeSchema = createInsertSchema(noticesTable).omit({ id: true, createdAt: true });
export const selectNoticeSchema = createSelectSchema(noticesTable);
export type InsertNotice = z.infer<typeof insertNoticeSchema>;
export type Notice = typeof noticesTable.$inferSelect;
