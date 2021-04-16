import Password from "./password";

describe("Password validator", () => {
  test("Should not create password with minimum 6 characters", () => {
    expect(Password.validate("12345")).toBe(false);
  });

  test("Should not create password with empty values", () => {
    expect(Password.validate("")).toBe(false);
  });
});