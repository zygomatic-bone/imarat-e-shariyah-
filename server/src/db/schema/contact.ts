import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const contactMessagesTable = pgTable("contact_messages", {
  id:        serial("id").primaryKey(),
  name:      text("name").notNull(),
  email:     text("email").notNull(),
  message:   text("message").notNull(),
  isRead:    boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
