import { Either, left, right } from "../../../../shared/either";
import { InvalidCategoryError } from "../errors/category-error";

class Category {
  private readonly category: string;

  constructor(category: string) {
    this.category = category;
    Object.freeze(this);
  }

  get value(): string {
    return this.category;
  }

  static create(category: string): Either<InvalidCategoryError, Category> {
    if (!Category.validate(category)) {
      return left(new InvalidCategoryError(category));
    }

    return right(new Category(category));
  }

  static validate(category: string): boolean {
    if (!category || category.trim().length < 1 || category.trim().length > 80) {
      return false;
    }

    return true;
  }
}

export default Category;