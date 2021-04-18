import Joined from "./joined";

describe("Joined value object validator", () => {
  test("Should not create a joined object with value negative", () => {
    expect(Joined.validate(0.0333)).toBe(false);
  });
});