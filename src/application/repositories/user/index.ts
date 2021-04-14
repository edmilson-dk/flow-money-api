import { UserPersistDTO } from "../../../domain/dtos/user";

export interface IUserRepository {
  add: (data: UserPersistDTO) => Promise<void>;
  existUserByEmail: (email: string) => Promise<boolean>;
}