import { DropTransactionResponse } from "../../../../application/use-cases/transaction/responses/drop-transaction";
import { ITransactionUseCases } from "../../../../domain/use-cases/transaction";
import { badRequest, ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";

export class DropTransactionController implements BaseController {
  private readonly transactionUseCases: ITransactionUseCases;

  constructor(transactionUseCases: ITransactionUseCases) {
    this.transactionUseCases = transactionUseCases;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try { 
      const { id } = httpRequest.params;
      const userId = httpRequest.rest.userId;

      const deletedTransaction: DropTransactionResponse = await this.transactionUseCases.dropTransaction(id, userId);

      if (deletedTransaction.isLeft()) {
        return badRequest(deletedTransaction.value, 404);
      }

      return ok(deletedTransaction.value, 200);
    } catch (err) {
      return serverError(err.message);
    }
  }
}