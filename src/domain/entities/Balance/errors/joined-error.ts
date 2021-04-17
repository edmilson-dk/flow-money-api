export class JoinedError extends Error implements DomainError {
  constructor (joined: number) {
    super(`The joined "${joined}" is invalid.`);
    this.name = 'JoinedError';
  }
}