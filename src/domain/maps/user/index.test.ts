import UserMap from "./index";

describe("User map tests", () => {
  const userMap = new UserMap();

  test("Should return a user domain object", () => {
    const domainObject = userMap.toDomain({
      id: '12345',
      name: 'Alex',
      email: 'test@gmail.com',
      password: '12345',
      unusedData: false,
      propertyInvalid: '0099009',
      phone: '99009909'
    });

    expect(domainObject).toEqual({
      id: '12345',
      name: 'Alex',
      email: 'test@gmail.com',
      password: '12345',
    });
  });

  test("Should return a user persist object", () => {
    const domainObject = userMap.toPersist({
      id: '12345',
      name: 'Alex',
      email: 'test@gmail.com',
      password: '12345',
      unusedData: false,
      propertyInvalid: '0099009',
      phone: '99009909'
    });

    expect(domainObject).toEqual({
      id: '12345',
      name: 'Alex',
      email: 'test@gmail.com',
      password: '12345',
    });
  });

  test("Should return a user dto object", () => {
    const domainObject = userMap.toDTO({
      id: '12345',
      name: 'Alex',
      email: 'test@gmail.com',
      password: '12345',
      token: "userToken",
      unusedData: false,
      propertyInvalid: '0099009',
      phone: '99009909'
    });

    expect(domainObject).toEqual({
      id: '12345',
      name: 'Alex',
      email: 'test@gmail.com',
      token: "userToken"
    });
  });
})