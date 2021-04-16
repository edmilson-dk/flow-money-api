import db from "../../../../../drivers/db/knex/postgres";

export async function cleanColumn(columnName: string): Promise<void> {
  await db(columnName).del();
}