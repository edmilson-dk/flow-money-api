import IsDecrement from "../is-decrement";

describe("IsDecrement value object validator", () => {
  test("Should not create a is-decrement object with null value", () => {
    expect(IsDecrement.validate(null)).toBeFalsy();
  });
});