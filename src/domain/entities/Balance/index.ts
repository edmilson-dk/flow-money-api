import { Either, left, right } from "../../../shared/either";
import { BalanceDomainDTO } from "../../dtos/balance";
import { JoinedError } from "./errors/joined-error";
import { LeftValueError } from "./errors/left-error";
import { UserIdError } from "./errors/user-id-error";
import Joined from "./values-objects/joined";
import LeftValue from "./values-objects/left";
import UserId from "./values-objects/user-id";

class Balance {
  public joined: Joined;
  public left: LeftValue;
  public total: number;
  public userId: UserId;

  constructor(joined: Joined, left: LeftValue, userId: UserId) {
    this.joined = joined;
    this.left = left;
    this.userId = userId;
    this.total = Number(joined) - Number(left);
  }

  static create(data: BalanceDomainDTO): Either<JoinedError | LeftValueError, Balance> {
    const joinedOrError: Either<JoinedError, Joined> = Joined.create(data.joined);
    const leftOrError: Either<LeftValueError, LeftValue> = LeftValue.create(data.left);
    const userIdOrError: Either<UserIdError, UserId> = UserId.create(data.userId);

    if (joinedOrError.isLeft()) {
      return left(new JoinedError(data.joined));
    }
    if (leftOrError.isLeft()) {
      return left(new LeftValueError(data.left));
    }
    if (userIdOrError.isLeft()) {
      return left(new UserIdError(data.userId));
    }

    const joined: Joined = joinedOrError.value;
    const leftValue: LeftValue = leftOrError.value;
    const userId: UserId = userIdOrError.value;

    return right(new Balance(joined, leftValue, userId));
  }
}

export default Balance;