import { AddUserResponse } from "../../../application/use-cases/user/responses/add-user-response";
import { UserDataDTO } from "../../dtos/user";

export interface IUserUseCases {
  add: (data: UserDataDTO) => Promise<AddUserResponse>;
}