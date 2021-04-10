import bcrypt from "bcryptjs";

export async function encrypt(password: string, salt: number): Promise<string> {  
  const userSalt = salt > 10 ? 10 : salt;
  const saltResult = await bcrypt.genSalt(userSalt);
  const result = await bcrypt.hash(password, saltResult);

  return result;
}

export async function isValidHash(currentHash: string, originalHash: string): Promise<boolean> {
  const isValid = await bcrypt.compare(currentHash, originalHash);
  return isValid;
}