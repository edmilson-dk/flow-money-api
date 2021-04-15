import { AddUserResponse } from "../../../application/use-cases/user/responses/add-user-response";
import { GetUserResponse } from "../../../application/use-cases/user/responses/get-user-response";
import { UserDataDTO } from "../../dtos/user";

export interface IUserUseCases {
  add: (data: UserDataDTO) => Promise<AddUserResponse>;
  getUser: (email: string, password: string) => Promise<GetUserResponse>;
}