import { UserDTO } from "../dtos/user";

class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor({ id, name, email, password }: UserDTO) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  getValues() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    }
  }
}

export default User;