import { IUserUseCases } from "../../../../domain/use-cases/user";
import { badRequest, ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { MissingParamError } from "../errors/missing-params-error";
import { AddUserResponse } from "../../../../application/use-cases/user/responses/add-user-response";
import { createJWT } from "../../../../infra/jwt-token";
import UserMap from "../../../../domain/dtos/user/user-map";
import { BaseController } from "../baseControler";

import { config } from "dotenv";
config();

export class AddUserController implements BaseController {
  private readonly userUseCases: IUserUseCases;

  constructor(userUseCases: IUserUseCases) {
    this.userUseCases  = userUseCases;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body;

      if (!name || !email || !password) {
        return badRequest(new MissingParamError(), 401);
      }
      
      const addUserResponse: AddUserResponse = await this.userUseCases.add({ name, email, password });

      if (addUserResponse.isLeft()) {
        return badRequest(addUserResponse.value, 401);
      }

      const token = createJWT(addUserResponse.value.email, addUserResponse.value.id, process.env.TOKEN_EXPIRES as string);
      const userDTO = UserMap.toDTO({ token, ...addUserResponse.value });

      return ok(userDTO, 201);
    } catch (err) {
      return serverError(err.message);
    }
  }
}