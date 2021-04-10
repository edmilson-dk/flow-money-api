import { IUserRepository } from "../../../../../application/repositories/user";
import { UserDTO } from "../../../../../domain/entities/dtos/user";
import db from "../../../../../drivers/db/knex/postgres";

class UserRepository implements IUserRepository {
  async add({ id, name, email, password }: UserDTO): Promise<void> {
    await db("users")
      .insert({ id, name, email, password });

    return;
  }

  async findUserByEmail(email: string): Promise<{} | UserDTO> {
    const row = await db("users")
      .where({ email });

    if (!(row.length === 0)) return {};

    const { id, name, email: userEmail, password } = row[0];

    return { id, name, email: userEmail, password };
  }
}

export default UserRepository;