import { TransactionDataDTO } from "../../../../domain/dtos/transaction";
import Transaction from "../../../../domain/entities/Transaction";
import { InvalidCategoryError } from "../../../../domain/entities/Transaction/errors/category-error";
import { InvalidIsDecrementError } from "../../../../domain/entities/Transaction/errors/is-decrement-error";
import { InvalidTitleError } from "../../../../domain/entities/Transaction/errors/title-error";
import { UserIdError } from "../../../../domain/entities/Transaction/errors/user-id-error";
import { ValueError } from "../../../../domain/entities/Transaction/errors/value-error";
import { Either } from "../../../../shared/either";

export type AddTransactionResponse = Either<ValueError | InvalidIsDecrementError | InvalidCategoryError | InvalidTitleError | UserIdError, TransactionDataDTO>;