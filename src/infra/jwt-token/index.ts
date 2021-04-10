import  JWT, { VerifyCallback } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { createJwtData } from "./types";

export function createJWT(data: createJwtData) {
  const token = JWT.sign(
    { email: data.email, id: data.id },
    process.env.SECRET as string, 
    { expiresIn: data.expires });

  return token;
}

export function verifyJWT(token: string, callback: VerifyCallback) {
  JWT.verify(token, process.env.SECRET as string, callback);
}