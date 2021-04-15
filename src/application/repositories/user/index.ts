import { UserPersistDTO } from "../../../domain/dtos/user";

export interface IUserRepository {
  add: (data: UserPersistDTO) => Promise<void>;
  getUser: (email: string) => Promise<UserPersistDTO>;
  existUserByEmail: (email: string) => Promise<boolean>;
}