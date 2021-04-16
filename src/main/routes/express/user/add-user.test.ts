import request from "supertest";

import app from "../../../app";
import { cleanColumn } from "../../../../infra/repositories/postgres/knex/helpers/knex-helpers";

describe("User routes tests", () => {
  const validData = {
    name: "Edmilson",
    email: "test@gmail.com",
    password: "123456789",
  };

  beforeEach(async () => {
    await cleanColumn("users");
  });

  test("Should return created user account sucess", async () => {
    await request(app)
      .post("/api/register")
      .send(validData).expect(201);
  });

  test("Should not return created user account sucess if alredy exists user", async () => {
    await request(app)
      .post("/api/register")
      .send(validData);

    await request(app)
      .post("/api/register")
      .send(validData).expect(401);
  });

  test("Should not return created user account sucess with invalid email", async () => {
    await request(app)
      .post("/api/register")
      .send({
        name: "Edmilson",
        email: "emailError",
        password: "123456789",
      }).expect(401);
  });

  test("Should not return created user account sucess with invalid password", async () => {
    await request(app)
      .post("/api/register")
      .send({
        name: "Edmilson",
        email: "test@gmail.com",
        password: "12",
      }).expect(401);
  });


  test("Should not return created user account sucess with invalid name", async () => {
    await request(app)
      .post("/api/register")
      .send({
        name: "a",
        email: "test@gmail.com",
        password: "123456789",
      }).expect(401);
  });
});