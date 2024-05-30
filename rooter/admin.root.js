import { Router } from "express";
import { adminConnexion, pageaccueiladmin,logoutadmin, getAllPsychologists, Pagepsy, rejectPsy, showImage, approvePsy, getAllApprovedPsychologists, showModifyStatusPage, getOnePsy } from "../controllers/admin.controllers.js";
import { psychologues } from "../controllers/accueil/accueilcontroller.js";
import { getAllPatients } from "../controllers/patients/patients.controlor.js";




export const Rootadmin = Router();

// route pour afficher la page d'acceuil
Rootadmin.get("/",pageaccueiladmin)

//pour la page de connexion au dashboard
Rootadmin.post("/login",adminConnexion);

//route pour se deconnecter

Rootadmin.get("/logout" , logoutadmin)

//route pour recuperer tous les psy
Rootadmin.get("/findallpsy",getAllPsychologists)
//route pour afficher la page des psys
Rootadmin.get("/allpsy",Pagepsy);

//route pour approuver un psy par son id
Rootadmin.get("/admin/:id", approvePsy);

//route pour supprimer un psy par son id

Rootadmin.delete("/suprimmerpsy/:id",rejectPsy)

//Route pour afficher lesimage 
Rootadmin.get("/showImage/:id",showImage)

//route pour trouver un psy par son id

Rootadmin.get("/findpsybyid/:psyId",getOnePsy)
//route pour afficher les psy  approuvé par l'administrateur
Rootadmin.get("/approuved",getAllApprovedPsychologists)

//Route pour afficher la page de modification des psy

Rootadmin.get("/modif/:id",showModifyStatusPage)

//Route pour afficher les patients

Rootadmin.get("/allpatients",getAllPatients)

