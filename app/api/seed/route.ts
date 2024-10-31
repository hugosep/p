import { db, collections } from 'lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  await db.insert(collections).values([
    {
      id: 1,
      name: "primera colección",
      type: "want",
      user_id: 1,
      numberOf: 0
    },
    {
      id: 2,
      name: "segunda colección",
      type: "want",
      user_id: 1,
      numberOf: 0
    },
    {
      id: 3,
      name: "tercera colección",
      type: "have",
      user_id: 1,
      numberOf: 0
    },
    {
      id: 4,
      name: "cuarta colección",
      type: "have",
      user_id: 1,
      numberOf: 0
    }
  ]);
}
