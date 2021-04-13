import { Either, left, right } from "../../../../shared/either";
import { InvalidPasswordError } from "../errors/password-error";

class Password {
  private readonly password: string;

  private constructor(password: string) {
    this.password = password;

    Object.freeze(this);
  }

  static create(password: string): Either<InvalidPasswordError, Password> {
    if (!Password.validate(password)) {
      return left(new InvalidPasswordError(password));
    }

    return right(new Password(password));
  }

  get value(): string {
    return this.password;
  }

  static validate(password: string) {
    if (!password || password.trim().length < 6 || password.trim().length > 32) {
      return false;
    }
    return true;
  }
}

export default Password;