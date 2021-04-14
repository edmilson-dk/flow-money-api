import { UserDomainDTO } from "../../../../domain/dtos/user";
import { InvalidEmailError } from "../../../../domain/entities/User/errors/email-error";
import { InvalidIdError } from "../../../../domain/entities/User/errors/id-error";
import { InvalidNameError } from "../../../../domain/entities/User/errors/name-error";
import { InvalidPasswordError } from "../../../../domain/entities/User/errors/password-error";
import { Either } from "../../../../shared/either";
import { AlredyExistsUserError } from "../errors/exists-user-error";

export type AddUserResponse = Either<InvalidEmailError | InvalidNameError | InvalidIdError | InvalidPasswordError | AlredyExistsUserError, UserDomainDTO>;