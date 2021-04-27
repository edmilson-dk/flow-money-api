import Title from "./title";

describe("Title value object validator", () => {
  test("Should not create a title of less than 3 characters", () => {
    expect(Title.validate("aa")).toBeFalsy();
  });
  test("Should not create a title longer than 80 characters", () => {
    expect(Title.validate("aa".repeat(81))).toBeFalsy();
  });
});