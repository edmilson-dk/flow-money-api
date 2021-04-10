import { IMapperBase } from "../IMapperBase";
import { UserDomainDTO, UserDTO, UserPersistDTO } from "../../dtos/user";

class UserMap implements IMapperBase<UserDomainDTO, UserPersistDTO, UserDTO> {
  toDomain(data: any): UserDomainDTO {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
    }
  }

  toPersist(data: any): UserPersistDTO {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
    }
  }

  toDTO(data: any): UserDTO {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      token: data.token,
    }
  }
}

export default UserMap;