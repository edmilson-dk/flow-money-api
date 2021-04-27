import Title from "./title";

describe("Title value object validator", () => {
  test("Should not create a title of less than 3 characters", () => {
    expect(Title.validate("aa")).toBeFalsy();
  });
});