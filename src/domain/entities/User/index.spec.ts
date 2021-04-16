import User from "./index";
import { generateId } from "../../../utils/generateId";
import { left } from "../../../shared/either";
import { InvalidEmailError } from "./errors/email-error";
import { InvalidPasswordError } from "./errors/password-error";
import { InvalidNameError } from "./errors/name-error";
import { InvalidIdError } from "./errors/id-error";

describe("Create a user enttiy tests", () => {
  const invalidEmail = "invalidEmail";
  const invalidPassword = "12";
  const invalidName = "al";

  test("Should not create a user entity object with invalid email", () => {
    const id = generateId();

    const userOrError = User.create({
      name: "Edmilson",
      email: invalidEmail,
      password: "12345678",
      id,
    });

    expect(userOrError).toEqual(left(new InvalidEmailError(invalidEmail)));
  });

  test("Should not create a user entity object with invalid password", () => {
    const id = generateId();

    const userOrError = User.create({
      name: "Edmilson",
      email: "test@gmail.comq",
      password: invalidPassword,
      id,
    });

    expect(userOrError).toEqual(left(new InvalidPasswordError(invalidPassword)));
  });

  test("Should not create a user entity object with invalid name", () => {
    const id = generateId();

    const userOrError = User.create({
      name: invalidName,
      email: "test@gmail.comq",
      password: invalidPassword,
      id,
    });

    expect(userOrError).toEqual(left(new InvalidNameError(invalidName)));
  });

  test("Should not create a user entity object with invalid id", () => {
    const id = "";

    const userOrError = User.create({
      name: "Edmilson",
      email: "test@gmail.comq",
      password: "1234567",
      id,
    });

    expect(userOrError).toEqual(left(new InvalidIdError(id)));
  });
});