import { UserPersistDTO } from "../../../domain/dtos/user";

export interface IUserRepository {
  add: ({ id, name, email, password }: UserPersistDTO) => Promise<void>;
  findUserByEmail: (email: string) => Promise<UserPersistDTO | {}>;
}