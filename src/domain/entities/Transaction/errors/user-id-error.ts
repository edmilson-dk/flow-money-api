export class UserIdError extends Error implements DomainError {
  constructor (userId: string) {
    super(`The userId "${userId}" is invalid.`);
    this.name = 'UserIdError';
  }
}