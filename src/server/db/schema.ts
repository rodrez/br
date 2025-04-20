import { relations, sql } from "drizzle-orm";
import { index, primaryKey, sqliteTableCreator } from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `br_${name}`);

export const posts = createTable(
	"post",
	(d) => ({
		id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
		name: d.text({ length: 256 }),
		createdById: d
			.text({ length: 255 })
			.notNull()
			.references(() => users.id),
		createdAt: d
			.integer({ mode: "timestamp" })
			.default(sql`(unixepoch())`)
			.notNull(),
		updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
	}),
	(t) => [
		index("created_by_idx").on(t.createdById),
		index("name_idx").on(t.name),
	],
);

// Categories for rankings (e.g., Electronics, Fashion, Food)
export const categories = createTable(
	"category",
	(d) => ({
		id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
		name: d.text({ length: 256 }).notNull(),
		slug: d.text({ length: 256 }).notNull(),
		description: d.text(),
		imageUrl: d.text(),
		createdAt: d
			.integer({ mode: "timestamp" })
			.default(sql`(unixepoch())`)
			.notNull(),
		updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
	}),
	(t) => [
		index("category_name_idx").on(t.name),
		index("category_slug_idx").on(t.slug),
	],
);

// Brands that can be ranked
export const brands = createTable(
	"brand",
	(d) => ({
		id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
		name: d.text({ length: 256 }).notNull(),
		slug: d.text({ length: 256 }).notNull(),
		description: d.text(),
		logoUrl: d.text(),
		websiteUrl: d.text(),
		createdAt: d
			.integer({ mode: "timestamp" })
			.default(sql`(unixepoch())`)
			.notNull(),
		updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
	}),
	(t) => [
		index("brand_name_idx").on(t.name),
		index("brand_slug_idx").on(t.slug),
	],
);

// Rankings which connect brands to categories with a rank and score
export const rankings = createTable(
	"ranking",
	(d) => ({
		id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
		categoryId: d
			.integer({ mode: "number" })
			.notNull()
			.references(() => categories.id),
		brandId: d
			.integer({ mode: "number" })
			.notNull()
			.references(() => brands.id),
		rank: d.integer({ mode: "number" }).notNull(),
		score: d.real().notNull(),
		review: d.text(),
		createdById: d
			.text({ length: 255 })
			.notNull()
			.references(() => users.id),
		createdAt: d
			.integer({ mode: "timestamp" })
			.default(sql`(unixepoch())`)
			.notNull(),
		updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
	}),
	(t) => [
		index("ranking_category_idx").on(t.categoryId),
		index("ranking_brand_idx").on(t.brandId),
		index("ranking_rank_idx").on(t.rank),
		index("ranking_created_by_idx").on(t.createdById),
	],
);

// Define relations
export const categoriesRelations = relations(categories, ({ many }) => ({
	rankings: many(rankings),
}));

export const brandsRelations = relations(brands, ({ many }) => ({
	rankings: many(rankings),
}));

export const rankingsRelations = relations(rankings, ({ one }) => ({
	category: one(categories, {
		fields: [rankings.categoryId],
		references: [categories.id],
	}),
	brand: one(brands, {
		fields: [rankings.brandId],
		references: [brands.id],
	}),
	createdBy: one(users, {
		fields: [rankings.createdById],
		references: [users.id],
	}),
}));

export const users = createTable("user", (d) => ({
	id: d
		.text({ length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: d.text({ length: 255 }),
	email: d.text({ length: 255 }).notNull(),
	emailVerified: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`),
	image: d.text({ length: 255 }),
}));

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	rankings: many(rankings),
}));

export const accounts = createTable(
	"account",
	(d) => ({
		userId: d
			.text({ length: 255 })
			.notNull()
			.references(() => users.id),
		type: d.text({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
		provider: d.text({ length: 255 }).notNull(),
		providerAccountId: d.text({ length: 255 }).notNull(),
		refresh_token: d.text(),
		access_token: d.text(),
		expires_at: d.integer(),
		token_type: d.text({ length: 255 }),
		scope: d.text({ length: 255 }),
		id_token: d.text(),
		session_state: d.text({ length: 255 }),
	}),
	(t) => [
		primaryKey({
			columns: [t.provider, t.providerAccountId],
		}),
		index("account_user_id_idx").on(t.userId),
	],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
	"session",
	(d) => ({
		sessionToken: d.text({ length: 255 }).notNull().primaryKey(),
		userId: d
			.text({ length: 255 })
			.notNull()
			.references(() => users.id),
		expires: d.integer({ mode: "timestamp" }).notNull(),
	}),
	(t) => [index("session_userId_idx").on(t.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
	"verification_token",
	(d) => ({
		identifier: d.text({ length: 255 }).notNull(),
		token: d.text({ length: 255 }).notNull(),
		expires: d.integer({ mode: "timestamp" }).notNull(),
	}),
	(t) => [primaryKey({ columns: [t.identifier, t.token] })],
);
