import Value from "../value";

describe("Value value object validator", () => {
  test("Should not create a value object with a negative number", () => {
    expect(Value.validate(-10)).toBeFalsy();
  });
  test("Should not create a value object with a null value", () => {
    expect(Value.validate(null)).toBeFalsy();
  });
});