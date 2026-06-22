import { pgTable, serial, text, integer, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadershipSectionEnum = pgEnum("leadership_section", [
  "majlis",
  "sabiq",
  "arkan",
  "umumi",
]);

export const leadershipMembersTable = pgTable("leadership_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameUrdu: text("name_urdu").notNull().default(""),
  role: text("role").notNull(),
  roleUrdu: text("role_urdu").notNull().default(""),
  section: leadershipSectionEnum("section").notNull(),
  bio: text("bio").default(""),
  bioUrdu: text("bio_urdu").default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertLeadershipMemberSchema = createInsertSchema(leadershipMembersTable).omit({ id: true });
export const selectLeadershipMemberSchema = createSelectSchema(leadershipMembersTable);
export type InsertLeadershipMember = z.infer<typeof insertLeadershipMemberSchema>;
export type LeadershipMember = typeof leadershipMembersTable.$inferSelect;
