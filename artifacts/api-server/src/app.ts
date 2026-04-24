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

// Intentamos detectar la ruta correcta (Larga vs Corta)
const pathArtifacts = path.join(
  process.cwd(),
  "artifacts",
  "cafeteria-flor-cordoba",
  "public",
);
const pathRoot = path.join(process.cwd(), "public");

// Le damos permiso a Express de usar ambas carpetas
app.use(express.static(pathArtifacts));
app.use(express.static(pathRoot));

// Ruta principal con "Plan B"
app.get("/", (req, res) => {
  // Intentamos la ruta de artifacts primero
  res.sendFile(path.join(pathArtifacts, "index.html"), (err) => {
    if (err) {
      // Si falla (error 404), intentamos enviarlo desde la raíz
      res.sendFile(path.join(pathRoot, "index.html"), (err2) => {
        if (err2) {
          res
            .status(404)
            .send("No se encontró el archivo index.html en ninguna carpeta.");
        }
      });
    }
  });
});

app.use("/api", router);

export default app;
