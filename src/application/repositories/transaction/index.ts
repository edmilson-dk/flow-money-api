import { TransactionDTO, TransactionPersistDTO } from "../../../domain/dtos/transaction";

export interface ITransactionRepository {
  add: (data: TransactionPersistDTO) => Promise<void>;
  existsTransactionByTitle: (title: string, userId: string) => Promise<boolean>;
  existsTransactionById: (id: string, userId: string) => Promise<boolean>;
  getTransaction: (id: string, userId: string) => Promise<TransactionPersistDTO>;
  dropTransaction: (id: string, userId: string) => Promise<TransactionPersistDTO>;
  getTransactions: (userId: string, page: number) => Promise<TransactionDTO[] | []>;
}