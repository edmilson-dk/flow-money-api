import { left } from "../../../shared/either";
import { InvalidCategoryError } from "./errors/category-error";
import Transaction from "./index";

describe("Create a transaction entity tests", () => {
  const transactonData = {
    category: "Test category",
    isDecrement: false,
    title: "Test title",
    userId: "11001010",
    value: 1200
  };

  test("Shoult not create an transaction entity with invalid category value", () => {
    const data = Transaction.create({ ...transactonData, category: "" });
    expect(data).toEqual(left(new InvalidCategoryError("")));
  }); 
});