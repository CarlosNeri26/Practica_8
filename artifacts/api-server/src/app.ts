import express, { type Express } from "express";
import cors from "cors";
import * as pinoHttpModule from "pino-http";

// ¡Aquí están las dos extensiones .js clave para Vercel!
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

// Forzamos el tipado para evitar el error TS2349
const pinoHttp = (pinoHttpModule as any).default || pinoHttpModule;

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;

//corregir logger
