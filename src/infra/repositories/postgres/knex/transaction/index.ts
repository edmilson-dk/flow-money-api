import { ITransactionRepository } from "../../../../../application/repositories/transaction";
import { TransactionPersistDTO } from "../../../../../domain/dtos/transaction";
import db from "../../../../../drivers/db/knex/postgres";

class TransactionRepository implements ITransactionRepository {
  async add(data: TransactionPersistDTO): Promise<void> {
    await db("transactions")
      .insert({
        is_decrement: data.isDecrement,
        category: data.category,
        title: data.title,
        user_id: data.userId,
        value: data.value
      });

    return;
  }

  async existsTransactionByTitle(title: string): Promise<boolean> {
    const row = await db("transactions")
      .where({ title });

    return row.length > 0 ? true : false;
  }
}

export default TransactionRepository;