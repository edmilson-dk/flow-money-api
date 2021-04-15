import { UserPersistDTO } from "../../../../domain/dtos/user";
import { Either } from "../../../../shared/either";
import { InvalidUserPasswordError } from "../errors/invalid-password";
import { NotExistsUserError } from "../errors/not-exists-user-error";

export type GetUserResponse = Either<NotExistsUserError | InvalidUserPasswordError, UserPersistDTO>;