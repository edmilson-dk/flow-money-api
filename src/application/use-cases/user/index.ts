import { UserDTO } from "../../../domain/entities/dtos/user";
import User from "../../../domain/entities/User";
import { IUserUseCases } from "../../../domain/use-cases/user";
import { IUserRepository } from "../../repositories/user";

class UserUseCases implements IUserUseCases {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async add(data: UserDTO): Promise<void> {
    const user = new User({ ...data });
    await this.userRepository.add(user.getValues());

    return;
  }

  async findUserByEmail(email: string): Promise<{} | UserDTO> {
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }
}

export default UserUseCases;