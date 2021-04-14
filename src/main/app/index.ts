import express, { urlencoded, json } from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "../routes/express";

const app = express();

app.use(cors());
app.use(helmet());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api", routes);

export default app;