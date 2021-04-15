import { IUserRepository } from "../../../../../application/repositories/user";
import { UserPersistDTO } from "../../../../../domain/dtos/user";
import db from "../../../../../drivers/db/knex/postgres";

class UserRepository implements IUserRepository {
  async add({ id, name, email, password }: UserPersistDTO): Promise<void> {
    await db("users")
      .insert({ id, name, email, password });

    return;
  }

  async existUserByEmail(email: string): Promise<boolean> {
    const row = await db("users")
      .where({ email });

    return row.length > 0 ? true : false;
  }

  async getUser(email: string): Promise<UserPersistDTO> {
    const row = await db("users")
      .where({ email });

    return row[0];
  }
}

export default UserRepository;