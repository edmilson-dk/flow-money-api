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
      id: data.id,
    };
  }

  static toPersist(data: any): TransactionPersistDTO {
    return {
      value: Number(data.value),
      category: data.category,
      title: data.title,
      isDecrement: data.isDecrement ?? data.is_decrement,
      userId: data.userId ?? data.user_id,
      id: data.id,
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