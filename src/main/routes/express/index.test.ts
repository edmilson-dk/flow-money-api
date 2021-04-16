import request from "supertest";

import app from "../../app";
import { cleanColumn } from "../../../infra/repositories/postgres/knex/helpers/knex-helpers";

describe("User routes tests", () => {
  beforeEach(async () => {
    await cleanColumn("users");
  });

  test("Should return created user account sucess", async () => {
    await request(app)
      .post("/api/register")
      .send({
        name: "Edmilson",
        email: "test@gmail.com",
        password: "123456789",
      }).expect(201);
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
});