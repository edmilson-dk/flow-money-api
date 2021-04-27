import Left from "../left";

describe("Left value object validator", () => {
  test("Should not create a left object with value negative", () => {
    expect(Left.validate(-10)).toBe(false);
  });

  test("Should not create a left object with empty value", () => {
    expect(Left.validate(null)).toBe(false);
  });
});