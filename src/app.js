import express from "express";
import session from "express-session";
import {initializePassport} from "./Helpers/passportHelpers.js";
import passport from 'passport';
import dotenv from "dotenv";
import routerAuth from "./Routes/logeo.routes.js";
import conectarDB from "./config/database.js";

dotenv.config();
const app = express();

app.use(
  session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
const port = 5002;

initializePassport();

app.use("/", routerAuth);

conectarDB();
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/auth/google`);
});
