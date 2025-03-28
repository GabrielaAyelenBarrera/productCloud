import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import { engine } from "express-handlebars";
import viewsRouter from './routes/views.router.js';

// 🔹 Reemplazamos el viejo __dirname
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// 🔹 Swagger
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();

// 🔹 __dirname correcto para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// 🔹 Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(cookieParser());

// 🔹 Configuración de Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'Users.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 🔹 Configuración de Handlebars
app.engine("hbs", engine({
  extname: "hbs",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}));

app.set("view engine", "hbs");
app.set("views", './src/views');

// 🔹 Rutas
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

// 🔹 Solo escuchar si **NO estamos corriendo tests**
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

export default app;


//Entrega final 1:26min explca lo q FALTA: test para rutas + documentar + readme
//compartir public view de Docker al profe https://hub.docker.com/r/gabriellabarrera/proyectofinal aparte del repo de git hub de 1era entrega + 2da entrega
