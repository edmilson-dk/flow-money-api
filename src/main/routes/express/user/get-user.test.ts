import request from "supertest";

import app from "../../../app";
import { cleanColumn } from "../../../../infra/repositories/postgres/knex/helpers/knex-helpers";

describe("User routes tests", () => {
  const validData = {
    email: "test@gmail.com",
    password: "123456789",
  };

  beforeEach(async () => {
    await request(app)
      .post("/api/register")
      .send({
        name: "Edmilson",
        email: "test@gmail.com",
        password: "123456789",
      });
  });

  afterEach(async () => {
    await cleanColumn("users");
  })

  test("Should return login user success", async () => {
    await request(app)
      .post("/api/login")
      .send(validData).expect(200);
  });

  test("Should not return login user success with not exists email", async () => {
    await request(app)
      .post("/api/login")
      .send({
        email: "notexists@gmail.com",
        password: "123456789"
      }).expect(401);
  });


  test("Should not return login user success with invalid email", async () => {
    await request(app)
      .post("/api/login")
      .send({
        email: "emailError",
        password: "123456789"
      }).expect(401);
  });
});