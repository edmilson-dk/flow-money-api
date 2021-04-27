import Category from "./category";

describe("Category value object validator", () => {
  test("Should not create a category of less than 3 characters", () => {
    expect(Category.validate("aa")).toBeFalsy();
  }); 
});