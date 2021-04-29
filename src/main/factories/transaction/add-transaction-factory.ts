import { BaseController } from "../../../adapters/presentation/controllers/baseControler";
import { AddTransactionController } from "../../../adapters/presentation/controllers/transaction";
import BalanceUseCases from "../../../application/use-cases/balance";
import TransactionUseCases from "../../../application/use-cases/transaction";
import BalanceRepository from "../../../infra/repositories/postgres/knex/balance";
import TransactionRepository from "../../../infra/repositories/postgres/knex/transaction";

export function makeAddTransactionController(): BaseController {
  const transactionRepository = new TransactionRepository();
  const balanceRepository = new BalanceRepository();
  const balanceUseCases = new BalanceUseCases(balanceRepository)
  const transactionUseCases = new TransactionUseCases(transactionRepository, balanceUseCases);
  const addTransactionController = new AddTransactionController(transactionUseCases);

  return addTransactionController;
}