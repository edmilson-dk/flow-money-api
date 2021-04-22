import { BaseController } from "../../../adapters/presentation/controllers/baseControler";
import { AddUserController } from "../../../adapters/presentation/controllers/user";
import UserUseCases from "../../../application/use-cases/user";
import UserRepository from "../../../infra/repositories/postgres/knex/user";

export function makeAddUserController(): BaseController {
  const userRepository = new UserRepository();
  const userUseCases = new UserUseCases(userRepository);
  const addUserController = new AddUserController(userUseCases);

  return addUserController;
}