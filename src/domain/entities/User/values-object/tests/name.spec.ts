import Name from "../name";

describe("Name validator", () => {
  test("Should create name with minimum 4 characters", () => {
    expect(Name.validate("ed")).toBe(false);
  });

  test("Should not create name with more than 255 characters", () => {
    expect(Name.validate(`e`.repeat(256))).toBe(false);
  });

  test("Should not create name with empty value", () => {
    expect(Name.validate("")).toBe(false);
  })
});