export class InvalidIdError extends Error implements DomainError {
  constructor (id: string) {
    super(`The id "${id}" is invalid.`);
    this.name = 'InvalidIdError';
  }
}