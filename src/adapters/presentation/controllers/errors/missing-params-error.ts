export class MissingParamError extends Error implements ControllerError {
  constructor () {
    super("Missing params");
    this.name = "MissingParamError";
  }
}