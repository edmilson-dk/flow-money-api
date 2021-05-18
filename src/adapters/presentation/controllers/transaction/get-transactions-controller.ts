import { GetTransactionsResponse } from "../../../../application/use-cases/transaction/responses/get-transactions";
import { ITransactionUseCases } from "../../../../domain/use-cases/transaction";
import { ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";

export class GetTransactionsController implements BaseController {
  private readonly transactionUseCases: ITransactionUseCases;

  constructor(transactionUseCases: ITransactionUseCases) {
    this.transactionUseCases = transactionUseCases;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try { 
      const { page, limit, title_category } = httpRequest.query;
      const userId = httpRequest.rest.userId;

      const transactions: GetTransactionsResponse = await this.transactionUseCases.getTransactions(userId, page, limit, title_category);

      return ok(transactions, 200);
    } catch (err) {
      return serverError(err.message);
    }
  }
}