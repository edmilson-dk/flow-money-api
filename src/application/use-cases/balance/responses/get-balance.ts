import { BalancePersistDTO } from "../../../../domain/dtos/balance";
import { Either } from "../../../../shared/either";
import { NotExistsBalanceError } from "../errors/not-exists-balance-error";

export type GetBalanceResponse = Either<NotExistsBalanceError, BalancePersistDTO>;