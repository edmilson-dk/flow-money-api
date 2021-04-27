import { Either, left, right } from "../../../../shared/either";
import { UserIdError } from "../errors/user-id-error";

class UserId {
  private readonly userId: string; 

  constructor(userId: string) {
    this.userId = userId;
    Object.freeze(this);
  }

  get value(): string {
    return this.userId;
  }

  static create(userId: string): Either<UserIdError, UserId> {
    if (!UserId.validate(userId)) {
      return left(new UserIdError(userId));
    }

    return right(new UserId(userId));
  }

  static validate(userId: string): boolean {
    if (!userId) return false;
    if (userId.trim().length < 1) return false;

    return true;
  }
}

export default UserId;