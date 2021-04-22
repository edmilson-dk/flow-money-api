export class NotExistsBalanceError extends Error implements UsecaseError {
  constructor (userId: string) {
    super(`The Balance with user id: ${userId} not exists`);
    this.name = "NotExistsBalanceError";
  }
}