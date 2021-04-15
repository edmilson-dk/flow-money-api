import { BaseController } from "../../../adapters/presentation/controllers/baseControler";
import GetUserController from "../../../adapters/presentation/controllers/user/get-user-controller";
import UserUseCases from "../../../application/use-cases/user";
import UserRepository from "../../../infra/repositories/postgres/knex/user";

export function makeGetUserController(): BaseController {
  const userRepository = new UserRepository();
  const userUseCases = new UserUseCases(userRepository);
  const getUserController = new GetUserController(userUseCases);

  return getUserController;
}