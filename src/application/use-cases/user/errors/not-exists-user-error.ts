export class NotExistsUserError extends Error implements UsecaseError {
  constructor (email: string) {
    super(`The user with email: ${email } not exists`);
    this.name = "NotExistsUserError";
  }
}