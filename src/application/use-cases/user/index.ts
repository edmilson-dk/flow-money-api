import { UserDataDTO, UserDomainDTO, UserPersistDTO } from "../../../domain/dtos/user";
import User from "../../../domain/entities/User";
import { InvalidEmailError } from "../../../domain/entities/User/errors/email-error";
import { InvalidIdError } from "../../../domain/entities/User/errors/id-error";
import { InvalidNameError } from "../../../domain/entities/User/errors/name-error";
import { InvalidPasswordError } from "../../../domain/entities/User/errors/password-error";
import { AddUserResponse } from "./responses/add-user-response";
import { IUserUseCases } from "../../../domain/use-cases/user";
import { Either, left, right } from "../../../shared/either";
import { generateId } from "../../../utils/generateId";
import { IUserRepository } from "../../repositories/user";
import { AlredyExistsUserError } from "./errors/exists-user-error";
import { encryptData } from "../../../utils/hash-bcrypt";

class UserUseCases implements IUserUseCases {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async add(data: UserDataDTO): Promise<AddUserResponse> {
    const id = generateId();
    const userOrError: Either<InvalidNameError | InvalidEmailError | InvalidIdError | InvalidPasswordError, User>  = User.create({ id, ...data });
    
    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user: User = userOrError.value;
    const existUser = await this.userRepository.existUserByEmail(user.email.value);

    if (existUser) {
      return left(new AlredyExistsUserError(user.email.value));
    }

    const hashPassword = await encryptData(user.password.value, 10);

    const userData = {
      id: user.id.value,
      email: user.email.value,
      name: user.name.value,
      password: hashPassword,
    }

    await this.userRepository.add(userData);

    return right(userData);
  }
}

export default UserUseCases;