import UserRepository from "./index";
import { cleanColumn } from "../helpers/knex-helpers";
import { generateId } from "../../../../../utils/generateId";

function generateData() {
  const id = generateId();
  return { id, 
    email: `test${Math.round(Math.random() * 100)}@gmail.com`, 
    name: 'Edmilson', 
    password: '123456' 
  }
}

describe("User repository tests", () => {
  beforeEach(async () => {
    await cleanColumn("users");
  });

  test("Should add a user and get user data", async () => {
    const userRepo = new UserRepository();
    const user = generateData();
    
    await userRepo.add(user);
    expect((await userRepo.getUser(user.email))).toEqual(user);
  });
});