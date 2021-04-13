import { UserPersistDTO } from "../../../domain/dtos/user";
import User from "../../../domain/entities/User";
import { InvalidEmailError } from "../../../domain/entities/User/errors/email-error";
import { InvalidIdError } from "../../../domain/entities/User/errors/id-error";
import { InvalidNameError } from "../../../domain/entities/User/errors/name-error";
import { InvalidPasswordError } from "../../../domain/entities/User/errors/password-error";
import { IUserUseCases } from "../../../domain/use-cases/user";
import { Either, left } from "../../../shared/either";
import { IUserRepository } from "../../repositories/user";

class UserUseCases implements IUserUseCases {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async add(data: UserPersistDTO): Promise<any> {
    const userOrError: Either<InvalidNameError | InvalidEmailError | InvalidIdError | InvalidPasswordError, User>  = User.create({ ...data });
    
    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }
    const user: User = userOrError.value;

    await this.userRepository.add({
      id: user.id.value,
      email: user.email.value,
      name: user.name.value,
      password: user.password.value,
    });

    return;
  }

  async findUserByEmail(email: string): Promise<{} | UserPersistDTO> {
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }
}

export default UserUseCases;