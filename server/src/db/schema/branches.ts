import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const branchesTable = pgTable("branches", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  cityUrdu: text("city_urdu").notNull().default(""),
  cityKn: text("city_kn").notNull().default(""),
  address: text("address").notNull(),
  phone: text("phone").notNull().default(""),
  description: text("description").default(""),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const darulQazaJudgesTable = pgTable("darul_qaza_judges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameUrdu: text("name_urdu").notNull().default(""),
  role: text("role").notNull(),
  roleUrdu: text("role_urdu").notNull().default(""),
  since: text("since").default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertBranchSchema = createInsertSchema(branchesTable).omit({ id: true });
export const selectBranchSchema = createSelectSchema(branchesTable);
export type InsertBranch = z.infer<typeof insertBranchSchema>;
export type Branch = typeof branchesTable.$inferSelect;

export const insertJudgeSchema = createInsertSchema(darulQazaJudgesTable).omit({ id: true });
export const selectJudgeSchema = createSelectSchema(darulQazaJudgesTable);
export type InsertJudge = z.infer<typeof insertJudgeSchema>;
export type DarulQazaJudge = typeof darulQazaJudgesTable.$inferSelect;
