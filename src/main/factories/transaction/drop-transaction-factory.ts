import { BaseController } from "../../../adapters/presentation/controllers/baseControler";
import { DropTransactionController } from "../../../adapters/presentation/controllers/transaction/drop-transaction-controller";
import BalanceUseCases from "../../../application/use-cases/balance";
import TransactionUseCases from "../../../application/use-cases/transaction";
import BalanceRepository from "../../../infra/repositories/postgres/knex/balance";
import TransactionRepository from "../../../infra/repositories/postgres/knex/transaction";

export function makeDropTransactionController(): BaseController {
  const transactionRepository = new TransactionRepository();
  const balanceRepository = new BalanceRepository();
  const balanceUseCases = new BalanceUseCases(balanceRepository)
  const transactionUseCases = new TransactionUseCases(transactionRepository, balanceUseCases);
  const dropTransactionController = new DropTransactionController(transactionUseCases);

  return dropTransactionController;
}