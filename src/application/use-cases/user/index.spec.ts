import UserUseCases from "./index";
import UserRepository from "../../../infra/repositories/postgres/knex/user";
import { cleanColumn } from "../../../infra/repositories/postgres/knex/helpers/knex-helpers";
import { right } from "../../../shared/either";
import { InvalidEmailError } from "../../../domain/entities/User/errors/email-error";
import { InvalidNameError } from "../../../domain/entities/User/errors/name-error";

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
});