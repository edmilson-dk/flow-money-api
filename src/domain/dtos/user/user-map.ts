import { UserDTO } from "./index";

class UserMap {
  static toDTO(data: any): UserDTO {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      token: data.token,
    };
  }
}

export default UserMap;