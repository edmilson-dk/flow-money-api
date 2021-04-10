import { UserDTO } from "../../entities/dtos/user";

export interface IUserUseCases {
  add: ({ id, name, email, password }: UserDTO) => Promise<void>;
  findUserByEmail: (email: string) => Promise<UserDTO | {}>;
}