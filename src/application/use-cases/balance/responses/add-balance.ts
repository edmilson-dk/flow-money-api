import { BalanceDTO } from "../../../../domain/dtos/balance";
import { JoinedError } from "../../../../domain/entities/Balance/errors/joined-error";
import { LeftValueError } from "../../../../domain/entities/Balance/errors/left-error";
import { Either } from "../../../../shared/either";

export type AddBalanceResponse = Either<JoinedError | LeftValueError, BalanceDTO>;