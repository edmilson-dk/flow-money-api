import { encryptData, isValidHash } from "./index";

describe("Hash bcrypt validator", () => {
  const data = "123456";

  test("Should return a hash of data param", async () => {
    const hashed = await encryptData(data, 5);
    expect(hashed === data).toBe(false);
  });

  test("Should return true if is valid hash compare", async () => {
    const hashed = await encryptData(data, 5);
    const isValid = await isValidHash(data, hashed);
    expect(isValid).toBe(true);
  });
});