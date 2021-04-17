export class LeftValueError extends Error implements DomainError {
  constructor (left: number) {
    super(`The left "${left}" is invalid.`);
    this.name = 'LeftValueError';
  }
}