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

  static validate(leftValue: number): boolean {
    if (leftValue < 0) return false;
    if (leftValue === null) return false;
    
    return true;
  }
}

export default LeftValue;