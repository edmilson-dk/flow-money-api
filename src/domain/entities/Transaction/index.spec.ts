import { left } from "../../../shared/either";
import { InvalidCategoryError } from "./errors/category-error";
import { InvalidIsDecrementError } from "./errors/is-decrement-error";
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
});