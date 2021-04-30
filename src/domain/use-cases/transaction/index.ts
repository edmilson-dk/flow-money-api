import { AddTransactionResponse } from "../../../application/use-cases/transaction/responses/add-transaction";
import { DropTransactionResponse } from "../../../application/use-cases/transaction/responses/drop-transaction";
import { GetTransactionsResponse } from "../../../application/use-cases/transaction/responses/get-transactions";
import { TransactionDataDTO } from "../../dtos/transaction";

export interface ITransactionUseCases {
  add: (data: TransactionDataDTO) => Promise<AddTransactionResponse>;
  dropTransaction: (id: string, userId: string) => Promise<DropTransactionResponse>;
  getTransactions: (userId: string, page: number) => Promise<GetTransactionsResponse>;
}