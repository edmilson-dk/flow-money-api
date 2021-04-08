import express, { urlencoded, json } from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(urlencoded({ extended: true }));
app.use(json());

export default app;