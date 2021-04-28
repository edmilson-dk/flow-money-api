import UserUseCases from "./index";
import UserRepository from "../../../infra/repositories/postgres/knex/user";
import { cleanColumn } from "../../../infra/repositories/postgres/knex/helpers/knex-helpers";
import { InvalidEmailError } from "../../../domain/entities/User/errors/email-error";
import { InvalidNameError } from "../../../domain/entities/User/errors/name-error";
import { InvalidPasswordError } from "../../../domain/entities/User/errors/password-error";
import { AlredyExistsUserError } from "./errors/exists-user-error";

const userData = {
  name: "Alex",
  email: "test@gmail.com",
  password: "1234567",
}

describe("User use cases tests", () => {
  const userRepository = new UserRepository();
  const userUseCases = new UserUseCases(userRepository);
  
  beforeEach(async () => {
    await cleanColumn("users");
  }); 

  test("Should add an user in database", async () => {
    const user = await userUseCases.add(userData);
    expect(user.isRight()).toBeTruthy();
  });
  test("Should not add an user in database with invalid email", async () => {
    const user = await userUseCases.add({ ...userData, email: "errorEmail"});
    expect(user.value).toEqual(new InvalidEmailError("errorEmail"));
    expect(user.isLeft()).toBeTruthy();
  });
  test("Should not add an user in database with invalid name", async () => {
    const user = await userUseCases.add({ ...userData, name: ""});
    expect(user.value).toEqual(new InvalidNameError(""));
    expect(user.isLeft()).toBeTruthy();
  });
  test("Should not add an user in database with invalid password", async () => {
    const user = await userUseCases.add({ ...userData, password: "123"});
    expect(user.value).toEqual(new InvalidPasswordError("123"));
    expect(user.isLeft()).toBeTruthy();
  });
  test("Should not add a user to the database with an existing email in the database", async () => {
    await userUseCases.add(userData);
    const user = await userUseCases.add(userData);

    expect(user.value).toEqual(new AlredyExistsUserError(userData.email));
    expect(user.isLeft()).toBeTruthy();
  });
  test("User data must be returned", async () => {
    await userUseCases.add(userData);
    const user = await userUseCases.getUser(userData.email, userData.password);

    expect(user.isRight()).toBeTruthy();
  });
  test("User data must not be returned with an existing email in the database", async () => {
    await userUseCases.add(userData);
    const user = await userUseCases.getUser("emailerror@gmail.com", userData.password);

    expect(user.isLeft()).toBeTruthy();
  });
  test("Must not return user data with incorrect password", async () => {
    await userUseCases.add(userData);
    const user = await userUseCases.getUser(userData.email, "senhaincorreta");

    expect(user.isLeft()).toBeTruthy();
  });
});