import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import { engine } from "express-handlebars";
import {__dirname} from './utils/index.js'
import viewsRouter from './routes/views.router.js'
import path from 'path';
import {resolve} from 'path';

dotenv.config();
const baseName = resolve(__dirname,'../');

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(cookieParser());

app.engine("hbs", engine({ 
    extname: "hbs",
    runtimeOptions: {
        allowProtoPropertiesByDefault:true,
        allowProtoMethodsByDefault: true,
    }
    }));
app.set("view engine", "hbs");
app.set("views", './src/views');


app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use('/', viewsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//grabacion 50 min
