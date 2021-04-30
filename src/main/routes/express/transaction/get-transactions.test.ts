import request from "supertest";

import app from "../../../app";
import { cleanColumn } from "../../../../infra/repositories/postgres/knex/helpers/knex-helpers";

describe("Get all transactions router tests", () => {
  let userToken = '';
  let transactionId = '';

  const transactionData = {
    category: "Test category",
    isDecrement: false,
    value: 1000,
    title: "Test title",
  }

  beforeEach(async () => {
    const { body: { token } } = await request(app)
    .post("/api/register")
    .send({
      name: "Edmilson",
      email: "test@gmail.com",
      password: "123456789",
    });

    userToken = token;
  });

  afterEach(async () => {
    await cleanColumn("users");
    await cleanColumn("transactions");
    await cleanColumn("balances");
  });

  test("Should return all transactions data in database", async () => {
    await request(app)
    .post("/api/session/create/transaction")
    .send(transactionData)
    .set('Authorization', `Bearer ${userToken}`);

    await request(app)
      .post("/api/session/create/transaction")
      .send({ ...transactionData, title: "Other title"})
      .set('Authorization', `Bearer ${userToken}`);   

    const { body } = await request(app)
      .get("/api/session/transactions")
      .set('Authorization', `Bearer ${userToken}`);

    expect(body.length).toBe(2);
  });

  test("Should return empty data", async () => {
    const { body } = await request(app)
      .get("/api/session/transactions")
      .set('Authorization', `Bearer ${userToken}`);

    expect(body.length).toBe(0);
  });
});