import UserId from "../user-id";

describe("UserId value object validator", () => {
  test("Should not create a user-id object with an empty string", () => {
    expect(UserId.validate("")).toBeFalsy();
  });
  test("Should not create a user ID object with a null value", () => {
    expect(UserId.validate(null)).toBeFalsy();
  });
});