import { IBalanceRepository } from "../../../../../application/repositories/balance";
import { BalancePersistDTO } from "../../../../../domain/dtos/balance";
import db from "../../../../../drivers/db/knex/postgres";

class BalanceRepository implements IBalanceRepository {
  async add(data: BalancePersistDTO): Promise<void> {
    await db("balances")
      .insert({
        user_id: data.userId,
        joined: data.joined,
        left: data.left,
        total: data.total,
      });

    return;
  }

  async getBalance(userId: string): Promise<BalancePersistDTO> {
    const row = await db("balances")
      .where({ user_id: userId })
    
    return row[0];
  }

  async containBalance(userId: string): Promise<boolean> {
    const exists = await db("balances")
      .where({ user_id: userId });

    return exists.length > 0 ? true : false;
  }

  async updateBalance(data: BalancePersistDTO): Promise<void> {
    await db("balances")
      .where({ user_id: data.userId })
      .update({
        joined: data.joined,
        left: data.left,
        total: data.total,
      });

    return;
  }
}

export default BalanceRepository;