import request from "supertest";

import app from "../../../app";
import { cleanColumn } from "../../../../infra/repositories/postgres/knex/helpers/knex-helpers";

describe("Drop transaction router tests", () => {
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

    const { body} = await request(app)
      .post("/api/session/create/transaction")
      .send(transactionData)
      .set('Authorization', `Bearer ${userToken}`);

    transactionId = body.id;    
  });

  afterEach(async () => {
    await cleanColumn("users");
    await cleanColumn("transactions");
    await cleanColumn("balances");
  });

  test("Should delete the transaction with success", async () => {
    await request(app)
      .delete(`/api/session/drop/transaction/${transactionId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
  });

  test("Should not delete the transaction with success if transaction id is invalid", async () => {
    await request(app)
      .delete(`/api/session/drop/transaction/0393030`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(404);
  });
});