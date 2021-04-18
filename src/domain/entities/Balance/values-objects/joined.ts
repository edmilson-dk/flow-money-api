import { Either, left, right } from "../../../../shared/either";
import { JoinedError } from "../errors/joined-error";

class Joined {
  private readonly joined: number;

  constructor(joined: number) {
    this.joined = joined;
    Object.freeze(this);
  }

  get value(): number {
    return this.joined;
  }

  static create(joined: number): Either<JoinedError, Joined> {
    if (!Joined.validate(joined)) {
      return left(new JoinedError(joined));
    }

    return right(new Joined(joined));
  }

  static validate(joined: number): boolean {
    if (!joined) return false;
    if (joined < 0) return false;
    
    return true;
  }
}

export default Joined;