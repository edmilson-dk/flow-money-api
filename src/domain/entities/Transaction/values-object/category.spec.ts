import Category from "./category";

describe("Category value object validator", () => {
  test("Should not create a category of less than 3 characters", () => {
    expect(Category.validate("aa")).toBeFalsy();
  }); 
  test("Should not create a category longer than 80 characters", () => {
    expect(Category.validate("aa".repeat(81))).toBeFalsy();
  });
});