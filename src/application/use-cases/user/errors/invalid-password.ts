export class InvalidUserPasswordError extends Error implements UsecaseError {
  constructor (password: string) {
    super(`The user with password: ${password } is incorrect`);
    this.name = "InvalidUserPasswordError";
  }
}