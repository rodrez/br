import { type Config } from "drizzle-kit";

import { env } from "~/env.js";

export default {
  schema: "./src/server/db/schema/",
  driver: "better-sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["br_*"],
} satisfies Config;
