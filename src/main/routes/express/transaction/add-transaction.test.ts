import request from "supertest";

import app from "../../../app";
import { cleanColumn } from "../../../../infra/repositories/postgres/knex/helpers/knex-helpers";

describe("Add transaction router tests", () => {
  let userToken = '';
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

  test("Should return add transaction success", async () => {
    await request(app)
      .post("/api/session/create/transaction")
      .send(transactionData)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(201);
  });

  test("Should not return add transaction success with empty user token", async () => {
    await request(app)
      .post("/api/session/create/transaction")
      .send(transactionData)
      .set('Authorization', `Bearer ''`)
      .expect(401);
  });

  test("Should not return add transaction success with invalid category value", async () => {
    await request(app)
      .post("/api/session/create/transaction")
      .send({
        category: "",
        isDecrement: false,
        value: 1000,
        title: "Test title",
      })
      .set('Authorization', `Bearer ${userToken}`)
      .expect(401);
  });

  test("Should not return add transaction success with invalid is-decrement value", async () => {
    await request(app)
      .post("/api/session/create/transaction")
      .send({ ...transactionData, isDecrement: null })
      .set('Authorization', `Bearer ${userToken}`)
      .expect(401);
  });
});