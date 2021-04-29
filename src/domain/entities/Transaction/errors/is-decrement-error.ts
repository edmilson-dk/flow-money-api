export class InvalidIsDecrementError extends Error implements DomainError {
  constructor (isDecrement: boolean | string) {
    super(`The isDecrement "${isDecrement}" is invalid.`);
    this.name = 'InvalidIsDecrementError';
  }
}