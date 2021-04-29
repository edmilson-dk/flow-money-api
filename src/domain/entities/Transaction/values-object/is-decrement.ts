import { Either, left, right } from "../../../../shared/either";
import { InvalidIsDecrementError } from "../errors/is-decrement-error";

class IsDecrement {
  private readonly isDecrement: boolean | string;

  constructor(isDecrement: boolean | string) {
    this.isDecrement = isDecrement;
    Object.freeze(this);
  }

  get value(): boolean | string {
    return this.isDecrement;
  }

  static create(isDecrement: boolean | string): Either<InvalidIsDecrementError, IsDecrement> {
    if (!IsDecrement.validate(isDecrement)) {
      return left(new InvalidIsDecrementError(isDecrement));
    }

    return right(new IsDecrement(isDecrement));
  }

  static validate(isDecrement: boolean | string): boolean | string {
    if (isDecrement === null) return false;
    if (typeof isDecrement === "string" && isDecrement.trim().length <= 0) return false;

    return true;
  }
}

export default IsDecrement;