import  JWT, { VerifyCallback } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function createJWT(email: string, id: string, expires: string) {
  const token = JWT.sign(
    { email: email, id: id },
    process.env.SECRET as string, 
    { expiresIn: expires });

  return token;
}

export function verifyJWT(token: string, callback: VerifyCallback) {
  JWT.verify(token, process.env.SECRET as string, callback);
}