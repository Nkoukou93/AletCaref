import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { dbconfig } from "./config/db.js";
import { Rootadmin } from "./rooter/admin.root.js";
import { Rootpsy } from "./rooter/psy.root.js";
import { Rootpatient } from "./rooter/patient.root.js";
import { Articlesroot } from "./rooter/articles.root.js";
import { Rdvroot } from "./rooter/rdv.root.js";
import session from "express-session";
import { dirname } from "node:path";
import path from "path";
import { RouterAcceuil } from "./rooter/accueil.root.js";
import multer from "multer";


dotenv.config();

const App = express();
const port = process.env.NODE_ENV || 5000;
const server = createServer(App);

dbconfig.dbConect();
App.use("/", express.static("public"));
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// Session middleware
App.use(
  session({
    name: process.env.SESSION_NAME, // cookie key
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
      httpOnly: true,
      maxAge: null, // No expiration
      secure: false, // Only send over https
    },
  })
);
//multer





//routes
App.use("/", RouterAcceuil);
App.use("/admin", Rootadmin);
App.use("/psy", Rootpsy);
App.use("/patients", Rootpatient);
App.use("/articles", Articlesroot);
App.use("/rdv", Rdvroot);

server.listen(port, () => {
  console.log(`Le serveur est demarré au ${port}`);
});
