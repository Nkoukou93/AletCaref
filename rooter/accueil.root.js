import { Router } from "express";
import { acceuil, connexionPatient,register ,psychologues,articles} from "../controllers/accueil/accueilcontroller.js";

export const RouterAcceuil=Router();

//route pour afficher la page d'acceuil
RouterAcceuil.get("/",acceuil) ;  

//la route pour afficher la page de connexion

RouterAcceuil.get("/connexion",connexionPatient)

//la route pour afficher la page d'enregistrement
RouterAcceuil.get("/inscription",register)

//la route pour afficher les psychologues
RouterAcceuil.get("/psy",psychologues)

//routes pour afficher la page articles
RouterAcceuil.get("/articles",articles)


