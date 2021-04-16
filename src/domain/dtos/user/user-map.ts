import { UserDTO, UserPersistDTO } from "./index";

class UserMap {
  static toDTO(data: any): UserDTO {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      token: data.token,
    };
  }

  static toPersist(data: any): UserPersistDTO {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      password: data.password,
    };
  }
}

export default UserMap;