import { Either, left, right } from "../../../shared/either";
import { TransactionDomainDTO } from "../../dtos/transaction";
import { InvalidCategoryError } from "./errors/category-error";
import { InvalidIdError } from "./errors/id-error";
import { InvalidIsDecrementError } from "./errors/is-decrement-error";
import { InvalidTitleError } from "./errors/title-error";
import { UserIdError } from "./errors/user-id-error";
import { ValueError } from "./errors/value-error";
import Category from "./values-object/category";
import Id from "./values-object/id";
import IsDecrement from "./values-object/is-decrement";
import Title from "./values-object/title";
import UserId from "./values-object/user-id";
import Value from "./values-object/value";

type TransactionProps = {
  value: Value;
  isDecrement: IsDecrement;
  title: Title;
  category: Category;
  userId: UserId;
  id: Id;
}

class Transaction {
  public value: Value;
  public isDecrement: IsDecrement;
  public title: Title;
  public category: Category;
  public userId: UserId;
  public id: Id;

  constructor(data: TransactionProps) {
    this.value = data.value;
    this.isDecrement = data.isDecrement,
    this.title = data.title;
    this.category = data.category;
    this.userId = data.userId;
    this.id = data.id;
  }

  getValues() {
    return {
      value: this.value.value,
      isDecrement: this.isDecrement.value,
      title: this.title.value,
      category: this.category.value,
      userId: this.userId.value,
      id: this.id.value,
    }
  }

  static create(data: TransactionDomainDTO):
    Either<ValueError | InvalidIsDecrementError | InvalidTitleError | InvalidCategoryError | UserIdError | InvalidIdError, Transaction>
  {
    const valueOrError: Either<ValueError, Value> = Value.create(data.value);
    const isDecOrError: Either<InvalidIsDecrementError, IsDecrement> = IsDecrement.create(data.isDecrement);
    const titleOrError: Either<InvalidTitleError, Title> = Title.create(data.title);
    const categoryOrError: Either<InvalidCategoryError, Category> = Category.create(data.category);
    const userIdOrError: Either<UserIdError, UserId> = UserId.create(data.userId);
    const idOrError: Either<InvalidIdError, Id> = Id.create(data.id);
    
    if (valueOrError.isLeft()) { 
      return left(new ValueError(data.value)); 
    }
    if (isDecOrError.isLeft()) {
      return left(new InvalidIsDecrementError(data.isDecrement));
    }
    if (titleOrError.isLeft()) {
      return left(new InvalidTitleError(data.title));
    }
    if (categoryOrError.isLeft()) {
      return left(new InvalidCategoryError(data.category));
    }
    if (userIdOrError.isLeft()) {
      return left(new UserIdError(data.userId));
    }
    if (idOrError.isLeft()) {
      return left(new InvalidIdError(data.id));
    }

    const value: Value = valueOrError.value;
    const isDecrement: IsDecrement = isDecOrError.value;
    const title: Title = titleOrError.value;
    const category: Category = categoryOrError.value;
    const userId: UserId = userIdOrError.value;
    const id: Id = idOrError.value;

    return right(new Transaction({ value, isDecrement, title, category, userId, id }));
  }
}

export default Transaction;