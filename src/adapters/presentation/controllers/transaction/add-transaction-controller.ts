import { AddTransactionResponse } from "../../../../application/use-cases/transaction/responses/add-transaction";
import TransactionMap from "../../../../domain/dtos/transaction/transaction-map";
import { ITransactionUseCases } from "../../../../domain/use-cases/transaction";
import { badRequest, ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";
import { MissingParamError } from "../errors/missing-params-error";

export class AddTransactionController implements BaseController {
  private readonly transactionUseCases: ITransactionUseCases;

  constructor(transactionUseCases: ITransactionUseCases) {
    this.transactionUseCases = transactionUseCases;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { isDecrement, value, category, title } = httpRequest.body;
      const userId = httpRequest.rest.userId;
    
      if (isDecrement === null || !value || !category || !title) {
        return badRequest(new MissingParamError(), 401);
      }

      const addTransactionResponse: AddTransactionResponse = await this.transactionUseCases.add({ isDecrement, value, category, title, userId });

      if (addTransactionResponse.isLeft()) {
        return badRequest(addTransactionResponse.value, 401);
      }

      const transactionDto = TransactionMap.toDTO(addTransactionResponse.value);
      
      return ok(transactionDto, 201);
    } catch (err) {
      console.log(err)
      return serverError(err.message);
    }
  }
}