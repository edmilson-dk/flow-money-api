import { Either, left, right } from "../../../../shared/either";
import { InvalidTitleError } from "../errors/title-error";

class Title {
  private readonly title: string;

  constructor(title: string) {
    this.title = title;
    Object.freeze(this);
  }

  get value(): string {
    return this.title;
  }

  static create(title: string): Either<InvalidTitleError, Title> {
    if (!Title.validate(title)) {
      return left(new InvalidTitleError(title));
    }

    return right(new Title(title));
  }

  static validate(title: string): boolean {
    if (!title || title.trim().length < 2 || title.trim().length > 255) {
      return false;
    }

    return true;
  }
}

export default Title;