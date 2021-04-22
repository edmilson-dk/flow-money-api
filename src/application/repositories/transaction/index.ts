import { TransactionPersistDTO } from "../../../domain/dtos/transaction";

export interface ITransactionRepository {
  add: (data: TransactionPersistDTO) => Promise<void>;
}