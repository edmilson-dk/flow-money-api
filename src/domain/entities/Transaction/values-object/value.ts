import { Either, left, right } from "../../../../shared/either";
import { ValueError } from "../errors/value-error";

class Value {
  private readonly valueE: number;

  constructor(valueE: number) {
    this.valueE = valueE;
    Object.freeze(this);
  }

  get value(): number {
    return this.valueE;
  }

  static create(value: number): Either<ValueError, Value> {
    if (!Value.validate(value)) {
      return left(new ValueError(value));
    }

    return right(new Value(value));
  }

  static validate(value: number): boolean {
    if (value < 0) return false;

    return true;
  }
}

export default Value;