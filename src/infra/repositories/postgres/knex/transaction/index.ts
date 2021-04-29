import { ITransactionRepository } from "../../../../../application/repositories/transaction";
import { TransactionPersistDTO } from "../../../../../domain/dtos/transaction";
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

  async getTransaction(id: string): Promise<TransactionPersistDTO> {
    const row = await db("transactions")
      .where({ id: id });

    return TransactionMap.toPersist(row[0]);
  }

  async existsTransactionByTitle(title: string): Promise<boolean> {
    const row = await db("transactions")
      .where({ title });

    return row.length > 0 ? true : false;
  }
}

export default TransactionRepository;