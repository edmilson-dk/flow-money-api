import { UserDTO } from "../../../domain/entities/dtos/user";

export interface IUserRepository {
  add: ({ id, name, email, password }: UserDTO) => Promise<void>;
  findUserByEmail: (email: string) => Promise<UserDTO | {}>;
}