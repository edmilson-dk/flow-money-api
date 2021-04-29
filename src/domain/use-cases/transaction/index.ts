import { AddTransactionResponse } from "../../../application/use-cases/transaction/responses/add-transaction";
import { DropTransactionResponse } from "../../../application/use-cases/transaction/responses/drop-transaction";
import { TransactionDataDTO } from "../../dtos/transaction";

export interface ITransactionUseCases {
  add: (data: TransactionDataDTO) => Promise<AddTransactionResponse>;
  dropTransaction: (id: string) => Promise<DropTransactionResponse>;
}