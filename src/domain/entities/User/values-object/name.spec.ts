import Name from "./name";

describe("Name validator", () => {
  test("Should create name with minimum 4 characters", () => {
    expect(Name.validate("ed")).toBe(false);
  });
});