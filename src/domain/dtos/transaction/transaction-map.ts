import { Either, left, right } from "../../../shared/either";
import { InvalidIsDecrementError } from "../../entities/Transaction/errors/is-decrement-error";
import { TransactionDTO, TransactionPersistDTO } from "./index";

class TransactionMap {
  static toDTO(data: any): TransactionDTO {
    return {
      value: data.value,
      category: data.category,
      title: data.title,
      isDecrement: data.isDecrement,
    };
  }

  static toPersist(data: any): TransactionPersistDTO {
    return {
      value: Number(data.value),
      category: data.category,
      title: data.title,
      isDecrement: data.isDecrement,
      userId: data.userId,
    };
  }

  static toDecrementBoolean(isDecrement: any): Either<InvalidIsDecrementError, boolean> {
    if (isDecrement === false || isDecrement === true) return right(isDecrement);
    if (typeof isDecrement === "string" && isDecrement.toUpperCase() === "FALSE") return right(false);
    if (typeof isDecrement === "string" && isDecrement.toUpperCase() === 'TRUE') return right(true);

    return left(new InvalidIsDecrementError(isDecrement));
  }
}

export default TransactionMap;