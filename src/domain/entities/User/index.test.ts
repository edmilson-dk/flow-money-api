import User from "./index";
import { generateId } from "../../../utils/generateId";
import { left } from "../../../shared/either";
import { InvalidEmailError } from "./errors/email-error";

describe("Create a user enttiy tests", () => {
  const invalidEmail = 'invalidEmail';

  test("Should not create a user entity object with invalid email", () => {
    const id = generateId();

    const userOrError = User.create({
      name: 'Edmilson',
      email: invalidEmail,
      password: '12345678',
      id,
    });

    expect(userOrError).toEqual(left(new InvalidEmailError(invalidEmail)));
  });
});