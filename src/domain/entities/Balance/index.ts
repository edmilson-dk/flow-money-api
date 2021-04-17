import { Either, left, right } from "../../../shared/either";
import { BalanceDomainDTO } from "../../dtos/balance";
import { JoinedError } from "./errors/joined-error";
import { LeftValueError } from "./errors/left-error";
import Joined from "./values-objects/joined";
import LeftValue from "./values-objects/left";

class Balance {
  public joined: Joined;
  public left: LeftValue;
  public total: number;

  constructor(joined: Joined, left: LeftValue ) {
    this.joined = joined;
    this.left = left;
    this.total = Number(joined)- Number(left);
  }

  static create(data: BalanceDomainDTO): Either<JoinedError | LeftValueError, Balance> {
    const joinedOrError: Either<JoinedError, Joined> = Joined.create(data.joined);
    const leftOrError: Either<LeftValueError, LeftValue> = LeftValue.create(data.left);

    if (joinedOrError.isLeft()) {
      return left(new JoinedError(data.joined));
    }
    if (leftOrError.isLeft()) {
      return left(new LeftValueError(data.left));
    }

    const joined: Joined = joinedOrError.value;
    const leftValue: LeftValue = leftOrError.value;

    return right(new Balance(joined, leftValue));
  }
}

export default Balance;