import { AddTransactionResponse } from "../../../application/use-cases/transaction/responses/add-transaction";
import { TransactionDataDTO } from "../../dtos/transaction";

export interface ITransactionUseCases {
  add: (data: TransactionDataDTO) => Promise<AddTransactionResponse>;
}