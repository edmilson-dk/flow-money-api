import { v4 } from "uuid";

export function generateId(): string {
  const id = v4();
  return id;
}