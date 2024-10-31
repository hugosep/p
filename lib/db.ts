import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  integer,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const typeEnum = pgEnum('type', ['want', 'have']);

export const collections = pgTable('collections', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: typeEnum('type').notNull(),
  user_id: integer('user_id').notNull(),
  numberOf: integer('numberof').notNull()
});

export type SelectCollection = typeof collections.$inferSelect;
export const insertCollectionSchema = createInsertSchema(collections);

export async function getCollections(
  search: string,
  offset: number
): Promise<{
  collections: SelectCollection[];
  newOffset: number | null;
  totalCollections: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      collections: await db
        .select()
        .from(collections)
        .where(ilike(collections.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalCollections: 0
    };
  }

  if (offset === null) {
    return { collections: [], newOffset: null, totalCollections: 0 };
  }

  let totalCollections = await db.select({ count: count() }).from(collections);
  let moreCollections = await db.select().from(collections).limit(5).offset(offset);
  let newOffset = moreCollections.length >= 5 ? offset + 5 : null;

  return {
    collections: moreCollections,
    newOffset,
    totalCollections: totalCollections[0].count
  };
}

export async function deleteCollectionById(id: number) {
  await db.delete(collections).where(eq(collections.id, id));
}
