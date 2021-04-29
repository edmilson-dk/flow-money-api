import { GetBalanceResponse } from "../../../../application/use-cases/balance/responses/get-balance";
import BalanceMap from "../../../../domain/dtos/balance/balance-map";
import { IBalanceUseCases } from "../../../../domain/use-cases/balance";
import { badRequest, ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";

export class GetBalanceController implements BaseController {
  private readonly balanceUseCases: IBalanceUseCases;

  constructor(balanceUseCases: IBalanceUseCases) {
    this.balanceUseCases = balanceUseCases;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.rest.userId;
     
      const getBalanceResponse: GetBalanceResponse = await this.balanceUseCases.getBalance(userId);

      if (getBalanceResponse.isLeft()) {
        return badRequest(getBalanceResponse.value, 404);
      }

      const balanceDTO = BalanceMap.toDTO(getBalanceResponse.value);

      return ok(balanceDTO, 200);
    } catch (err) {
      return serverError(err);
    }
  }
}