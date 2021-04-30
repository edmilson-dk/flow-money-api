import { ITransactionRepository } from "../../../../../application/repositories/transaction";
import { TransactionDTO, TransactionPersistDTO } from "../../../../../domain/dtos/transaction";
import TransactionMap from "../../../../../domain/dtos/transaction/transaction-map";
import db from "../../../../../drivers/db/knex/postgres";

class TransactionRepository implements ITransactionRepository {
  async add(data: TransactionPersistDTO): Promise<void> {
    await db("transactions")
      .insert({
        is_decrement: data.isDecrement,
        category: data.category,
        title: data.title,
        user_id: data.userId,
        value: data.value,
        id: data.id,
      });

    return;
  }

  async getTransaction(id: string, userId: string): Promise<TransactionPersistDTO> {
    const row = await db("transactions")
      .where({ id, user_id: userId });

    return TransactionMap.toPersist(row[0]);
  }

  async existsTransactionByTitle(title: string, userId: string): Promise<boolean> {
    const row = await db("transactions")
      .where({ title, user_id: userId });

    return row.length > 0 ? true : false;
  }

  async existsTransactionById(id: string, userId: string): Promise<boolean> {
    const row = await db("transactions")
      .where({ id, user_id: userId });

    return row.length > 0 ? true : false;
  }

  async dropTransaction(id: string, userId: string): Promise<TransactionPersistDTO> {
    const row = await db("transactions")
      .where({ id, user_id: userId })
      .del()
      .returning("*")

    return TransactionMap.toPersist(row[0]);
  }

  async getTransactions(userId: string, page = 1): Promise<TransactionDTO[] | []> {
    const LIMIT_ITEMS = 25;

    const rows = await db("transactions")
        .limit(LIMIT_ITEMS)
        .offset((page -1) * LIMIT_ITEMS)
        .orderBy('created_at', 'desc')
        .where({ user_id: userId });

    if (rows.length === 0) return [];

    const result = rows.map(row => TransactionMap.toDTO(row));
    return result;
  }
}

export default TransactionRepository;