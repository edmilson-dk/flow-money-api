import { TransactionPersistDTO } from "../../../../domain/dtos/transaction";
import { Either } from "../../../../shared/either";
import { NotExistsTransactionError } from "../errors/not-exists-transaction";

export type DropTransactionResponse = Either<NotExistsTransactionError, TransactionPersistDTO>;