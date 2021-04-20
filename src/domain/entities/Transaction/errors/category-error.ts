export class InvalidCategoryError extends Error implements DomainError {
  constructor (category: string) {
    super(`The category "${category}" is invalid.`);
    this.name = 'InvalidCategoryError';
  }
}