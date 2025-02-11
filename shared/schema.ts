import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

// PIN validation schema and table
export const pinAuthSchema = z.object({
  pin: z.string().length(4, "PIN must be exactly 4 digits").regex(/^\d+$/, "PIN must contain only numbers"),
});

export const pinCodes = pgTable("pin_codes", {
  id: serial("id").primaryKey(),
  pin: text("pin").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPinCodeSchema = createInsertSchema(pinCodes).pick({
  pin: true,
});

export type PinAuth = z.infer<typeof pinAuthSchema>;
export type PinCode = typeof pinCodes.$inferSelect;
export type InsertPinCode = z.infer<typeof insertPinCodeSchema>;