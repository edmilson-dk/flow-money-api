import { HttpRequest, HttpResponse } from "../http/ports/http";

export interface BaseController {
  execute: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}