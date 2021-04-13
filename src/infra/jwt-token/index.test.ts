import { createJWT } from "./index";

const tokenData = {
  email: 'test@gmail.com',
  id: '123',
  expires: '1h',
}

describe("JWT token utility methods tests", () => {
  test("Should return a string value", () => {
    const token = createJWT(tokenData.email, tokenData.id, tokenData.expires);
    expect(typeof token).toBe("string");
  });
});