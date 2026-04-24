import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import * as pinoHttpModule from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const pinoHttp = (pinoHttpModule as any).default || pinoHttpModule;
const app: Express = express();

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta súper sencilla a la raíz
const publicPath = path.join(process.cwd(), "public");

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"), (err) => {
    if (err) {
      res
        .status(404)
        .send(
          "El servidor está vivo, pero Git no ha subido el archivo index.html a la carpeta public.",
        );
    }
  });
});

app.use("/api", router);

export default app;
