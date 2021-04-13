import { Either, left, right } from "../../../../shared/either";
import { InvalidIdError } from "../errors/id-error";

class Id {
  private readonly id: string;

  private constructor(id: string) {
    this.id = id;

    Object.freeze(this);
  }

  static create(id: string): Either<InvalidIdError, Id> {
    if (!Id.validate(id) || id.trim().length <= 1) {
      return left(new InvalidIdError(id));
    }

    return right(new Id(id));
  }

  get value(): string {
    return this.id;
  }

  static validate(id: string) {
    if (!id || id.trim().length < 1) {
      return false;
    }
    return true;
  }
}

export default Id;