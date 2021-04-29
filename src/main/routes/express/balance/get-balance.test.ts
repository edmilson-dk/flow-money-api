import request from "supertest";

import app from "../../../app";
import { cleanColumn } from "../../../../infra/repositories/postgres/knex/helpers/knex-helpers";

describe("Get balance routes tests", () => {
  beforeEach(async () => {
    await cleanColumn("users");
    await cleanColumn("transactions");
    await cleanColumn("balances");
  });

  test("Should return get balance success", async () => {
    const { body: { token } } = await request(app)
    .post("/api/register")
    .send({
      name: "Edmilson",
      email: "test@gmail.com",
      password: "123456789",
    });
 
    await request(app)
      .post("/api/session/create/transaction")
      .send({
        category: "Test category",
        isDecrement: false,
        value: 1000,
        title: "Test title",
      })
      .set('Authorization', `Bearer ${token}`);
  
    const { body } = await request(app)
      .get("/api/session/balance")
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(body).toEqual({
        "joined": 1000,
        "left": 0,
        "total": 1000
      });
  });
});