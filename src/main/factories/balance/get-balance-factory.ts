import { GetBalanceController } from "../../../adapters/presentation/controllers/balance";
import { BaseController } from "../../../adapters/presentation/controllers/baseControler";
import BalanceUseCases from "../../../application/use-cases/balance";
import BalanceRepository from "../../../infra/repositories/postgres/knex/balance";

export function makeGetBalanceController(): BaseController {
  const balanceRepository = new BalanceRepository();
  const balanceUseCases = new BalanceUseCases(balanceRepository);
  const getBalanceController = new GetBalanceController(balanceUseCases);

  return getBalanceController;
}