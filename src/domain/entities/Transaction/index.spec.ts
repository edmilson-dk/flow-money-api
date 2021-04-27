import { left } from "../../../shared/either";
import { InvalidCategoryError } from "./errors/category-error";
import { InvalidIsDecrementError } from "./errors/is-decrement-error";
import { InvalidTitleError } from "./errors/title-error";
import { UserIdError } from "./errors/user-id-error";
import { ValueError } from "./errors/value-error";
import Transaction from "./index";

describe("Create a transaction entity tests", () => {
  const transactonData = {
    category: "Test category",
    isDecrement: false,
    title: "Test title",
    userId: "11001010",
    value: 1200
  };

  test("Should not create an transaction entity with invalid category value", () => {
    const data = Transaction.create({ ...transactonData, category: "" });
    expect(data).toEqual(left(new InvalidCategoryError("")));
  }); 
  test("Should not create an transaction entity with invalid is-decrement value", () => {
    const data = Transaction.create({ ...transactonData, isDecrement: null });
    expect(data).toEqual(left(new InvalidIsDecrementError(null)));
  });
  test("Should not create an transaction entity with invalid title value", () => {
    const data = Transaction.create({ ...transactonData, title: "a" });
    expect(data).toEqual(left(new InvalidTitleError("a")));
  });
  test("Should not create an transaction entity with invalid userId value", () => {
    const data = Transaction.create({ ...transactonData, userId: "" });
    expect(data).toEqual(left(new UserIdError("")));
  });
  test("Should not create an transaction entity with invalid 'value' value", () => {
    const data = Transaction.create({ ...transactonData, value: -10 });
    expect(data).toEqual(left(new ValueError(-10)));
  });
});