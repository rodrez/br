import { sql } from "drizzle-orm";
import { index, int, text } from "drizzle-orm/sqlite-core";
import { users } from "./auth";
import { createTable } from "./shared";

export const posts = createTable(
  "rank",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
    createdById: text("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }),
  },
  (table) => ({
    createdByIdIdx: index("createdById_idx").on(table.createdById),
    nameIndex: index("name_idx").on(table.name),
  }),
);
