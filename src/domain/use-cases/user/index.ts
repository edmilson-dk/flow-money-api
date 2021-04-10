import { UserPersistDTO } from "../../dtos/user";

export interface IUserUseCases {
  add: ({ id, name, email, password }: UserPersistDTO) => Promise<void>;
  findUserByEmail: (email: string) => Promise<UserPersistDTO | {}>;
}