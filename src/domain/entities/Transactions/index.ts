import { Either, left, right } from "../../../shared/either";
import { TransactionsDomainDTO } from "../../dtos/transactions";
import { InvalidCategoryError } from "./errors/category-error";
import { InvalidIsDecrementError } from "./errors/is-decrement-error";
import { InvalidTitleError } from "./errors/title-error";
import { UserIdError } from "./errors/user-id-error";
import { ValueError } from "./errors/value-error";
import Category from "./values-object/category";
import IsDecrement from "./values-object/is-decrement";
import Title from "./values-object/title";
import UserId from "./values-object/user-id";
import Value from "./values-object/value";

class Transactions {
  public value: Value;
  public isDecrement: IsDecrement;
  public title: Title;
  public category: Category;
  public userId: UserId;

  constructor(value: Value, isDecrement: IsDecrement, title: Title, category: Category, userId: UserId) {
    this.value = value;
    this.isDecrement = isDecrement,
    this.title = title;
    this.category = category;
    this.userId = userId;
  }

  static create(data: TransactionsDomainDTO):
    Either<ValueError | InvalidIsDecrementError | InvalidTitleError | InvalidCategoryError | UserIdError, Transactions>
  {
    const valueOrError: Either<ValueError, Value> = Value.create(data.value);
    const isDecOrError: Either<InvalidIsDecrementError, IsDecrement> = IsDecrement.create(data.isDecrement);
    const titleOrError: Either<InvalidTitleError, Title> = Title.create(data.title);
    const categoryOrError: Either<InvalidCategoryError, Category> = Category.create(data.category);
    const userIdOrError: Either<UserIdError, UserId> = UserId.create(data.userId);
    
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

    const value: Value = valueOrError.value;
    const isDecrement: IsDecrement = isDecOrError.value;
    const title: Title = titleOrError.value;
    const category: Category = categoryOrError.value;
    const userId: UserId = userIdOrError.value;

    return right(new Transactions(value, isDecrement, title, category, userId));
  }
}

export default Transactions;