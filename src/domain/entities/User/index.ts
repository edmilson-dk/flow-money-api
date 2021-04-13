import { Either, left, right } from "../../../shared/either";
import { UserDomainDTO } from "../../dtos/user";
import { InvalidEmailError } from "./errors/email-error";
import { InvalidNameError } from "./errors/name-error";
import { InvalidPasswordError } from "./errors/password-error";
import { InvalidIdError } from "./errors/id-error";
import Email from "./values-object/email";
import Name from "./values-object/name";
import Password from "./values-object/password";
import Id from "./values-object/id";

class User {
  public readonly id: Id;
  public readonly name: Name;
  public readonly email: Email;
  public readonly password: Password;

  private constructor(id: Id, name: Name, email: Email, password: Password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;

    Object.freeze(this);
  }

  static create(data: UserDomainDTO): Either<InvalidNameError | InvalidEmailError | InvalidIdError | InvalidPasswordError, User> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(data.name);
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(data.email);
    const passwordOrError: Either<InvalidPasswordError, Password> = Password.create(data.password);
    const idOrError: Either<InvalidIdError, Id> = Id.create(data.id);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }
    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }
    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }
    if(idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const name: Name = nameOrError.value;
    const email: Email = emailOrError.value;
    const password: Password = passwordOrError.value;
    const id: Id = idOrError.value;

    return right(new User(id, name, email, password));
  }
}

export default User;