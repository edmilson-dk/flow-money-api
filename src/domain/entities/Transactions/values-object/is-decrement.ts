import { Either, left, right } from "../../../../shared/either";
import { InvalidIsDecrementError } from "../errors/is-decrement-error";

class IsDecrement {
  private readonly isDecrement: boolean;

  constructor(isDecrement: boolean) {
    this.isDecrement = isDecrement;
    Object.freeze(this);
  }

  get value(): boolean {
    return this.isDecrement;
  }

  static create(isDecrement: boolean): Either<InvalidIsDecrementError, IsDecrement> {
    if (!IsDecrement.validate(isDecrement)) {
      return left(new InvalidIsDecrementError(isDecrement));
    }

    return right(new IsDecrement(isDecrement));
  }

  static validate(isDecrement: boolean): boolean {
    if (!isDecrement) {
      return false;
    }

    return true;
  }
}

export default IsDecrement;