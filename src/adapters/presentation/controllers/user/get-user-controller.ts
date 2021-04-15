import { IUserUseCases } from "../../../../domain/use-cases/user";
import { badRequest, ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { MissingParamError } from "../errors/missing-params-error";
import { createJWT } from "../../../../infra/jwt-token";
import UserMap from "../../../../domain/dtos/user/user-map";
import { BaseController } from "../baseControler";
import { GetUserResponse } from "../../../../application/use-cases/user/responses/get-user-response";

class GetUserController implements BaseController {
  private readonly userUseCases: IUserUseCases;

  constructor(userUseCases: IUserUseCases) {
    this.userUseCases  = userUseCases;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      if (!email || !password) {
        return badRequest(new MissingParamError(), 401);
      }
      
      const getUserResponse: GetUserResponse = await this.userUseCases.getUser(email, password);

      if (getUserResponse.isLeft()) {
        return badRequest(getUserResponse.value, 401);
      }

      const token = createJWT(getUserResponse.value.email, getUserResponse.value.id, '1h');
      const userDTO = UserMap.toDTO({ token, ...getUserResponse.value });

      return ok(userDTO, 200);
    } catch (err) {
      return serverError(err.message);
    }
  }
}

export default GetUserController;