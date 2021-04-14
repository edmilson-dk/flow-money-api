export class AlredyExistsUserError extends Error implements UsecaseError {
  constructor (email: string) {
    super(`The user with email: ${email } alredy exists`);
    this.name = 'AlredyExistsUserError';
  }
}
