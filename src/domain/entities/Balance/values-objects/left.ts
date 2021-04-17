import { Either, left, right } from "../../../../shared/either";
import { LeftValueError } from "../errors/left-error";

class LeftValue {
  private readonly leftValue: number;

  constructor(leftValue: number) {
    this.leftValue = leftValue;
    Object.freeze(this);
  }

  get value(): number {
    return this.leftValue;
  }

  static create(leftValue: number): Either<LeftValueError, LeftValue> {
    if (!LeftValue.validate(leftValue)) {
      return left(new LeftValueError(leftValue));
    }

    return right(new LeftValue(leftValue));
  }

  static validate(joined: number): boolean {
    if (!joined) return false;
    if (joined < 0) return false;
    
    return true;
  }
}

export default LeftValue;