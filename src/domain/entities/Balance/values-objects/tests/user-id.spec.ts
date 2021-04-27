import UserId from "../user-id";

describe("User Id value object validate", () => {
  test("Should not create user id with empty value", () => {
    expect(UserId.validate("")).toBe(false);
  });

  test("Should not create user id object with min 1 char", () => {
    expect(UserId.validate("1")).toBe(false);
  });
});