import { HttpResponse } from "../ports/http";
import { ServerError } from "../../controllers/errors/server-error";

export const badRequest = (error: Error, statusCode = 400): HttpResponse => ({
  statusCode,
  body: error.message
});

export const ok = (data: any, statusCode = 200): HttpResponse => ({
  statusCode,
  body: data
});

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason),
});
