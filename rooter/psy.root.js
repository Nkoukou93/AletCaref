import { Router } from "express";
;
import { addPsy, getAddPsyForm, getAllRDVByPsy,getAllpsy,getConnexionForm,  getPsyById, getPsyPhoto, loginPsy, logoutPsy, psyhome } from "../controllers/psy/psy.controlleur.js";

export const Rootpsy = Router();

//Route pour afficher la page d'accueil des psychologues
Rootpsy.get("/",psyhome)

//Route pour afficher le formulaire de connexion
Rootpsy.get("/connexion", getConnexionForm);

//Route pour afficher le formulaire d'inscription de psychologue
// Rootpsy.get("/register", getAddPsyForm); 
Rootpsy.get("/register", getAddPsyForm); //@todo : ajouté temporairement
//get all psys
Rootpsy.get("/psy",getPsyById)

//route pour ajouter un psy à la base de données
Rootpsy.post("/addPsy", addPsy);

//route pour recuperer un psy par son mot de passe et son email

// Rootpsy.post('/login', loginPsy)




//Route pour afficher la page de connexion au dashboard

Rootpsy.post("/dashboard",loginPsy);

//pour voir tous les rdv pris par un patient
Rootpsy.get('/rdv',getAllRDVByPsy)

//route pour se deconnecter
Rootpsy.get("/logout",logoutPsy)

// route pour afficher tous les psy

Rootpsy.get("/allpsy", getAllpsy)

//route pour afficher l'image du psy à partir de l'url de la photo

Rootpsy.get("/image/:filename", getPsyPhoto);



// Rootpsy.get("/image/:id", getPsyPhoto)


