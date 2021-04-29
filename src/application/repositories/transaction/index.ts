import { TransactionPersistDTO } from "../../../domain/dtos/transaction";

export interface ITransactionRepository {
  add: (data: TransactionPersistDTO) => Promise<void>;
  existsTransactionByTitle: (title: string) => Promise<boolean>;
  getTransaction: (id: string) => Promise<TransactionPersistDTO>;
  dropTransaction: (id: string) => Promise<void>;
}