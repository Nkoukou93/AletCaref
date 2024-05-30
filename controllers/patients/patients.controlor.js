
import { PatientsModel } from "../../model/patients/patients.model.js";
import { RdvModel } from "../../model/rdv/rdv.model.js";
import { dirname } from "node:path";


//controleur pour ajouter un patient à la base de données
export const addPatient = async (req, res) => {
  const patient = new PatientsModel(req.body);
  patient
    .save()
    .then(() => {
      // Envoyer une réponse avec le nom du patient ajouté
      res.send({ message: `Patient ${patient.name} enregistré avec succès.` });
    })
    .catch((err) => res.status(500).send(err));
};


//controleur qui permet de récuperer tous les patients dans la base de données
export const getAllPatients = async (req, res) => {
    try {
        const patients = await PatientsModel.find();
        res.send(patients);
    } catch (err) {
        res.status(500).send(err);
    }
}


//controleur pour recuprer un patient par son email et son mot de passe
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const patient = await PatientsModel.findOne({ email, password });
        if (!patient) {
            res.redirect("/connexion");
        } else {
            req.session.patient = patient._id;
            res.sendFile("view/patients/patient.view.dashboard.html", { root: dirname("view") });
        }
        
    } catch (err) {
        res.status(500).send(err);
    }
}
//controleur pour déconnecter un patient
export const logOut = (req, res) => {
  res.redirect("/connexion");
  req.session.destroy((err) => {
    if (err) {
      console.error("Erreur lors de la destruction de la session :", err);
      return res.status(500).send("Erreur lors de la déconnexion");
    }
    // Redirection vers la page de connexion
    // res.redirect("/connexion");
  });
};
//controleur pour prendre rdv la persone doit d'abord s'authentifier 
export const makeAppointment = async (req, res) => {
    const rdv = new RdvModel(req.body);

    if(!req.session.patient){
        res.redirect("/connexion");
    }else{
        try {
            
            const patientId=req.session.patient;
            rdv.patient=patientId;
            const result =await rdv.save();
            res.sendFile("view/patients/patient.view.dashboard.html", { root: dirname("view") });
        } catch (error) {
            res.status(500).send(error);
        }
        }
//     rdv
//         .save()
//         .then(() => res.send(rdv))
//         .catch((err) => res.status(500).send(err));
// }
// export const takeRDV = async (req,res)=>{
//     const rdv = new RdvModel(req.body);
//     rdv
//         .save()
//         .then(() => res.send(rdv))
//         .catch((err) => res.status(500).send(err));
}
//Controleur pour afficher les rendez-vous pris par un patient
export const showMyRDV=(req,res)=>{
    const rdv = new RdvModel(req.body);
    rdv
        .save()
        .then(() => res.send(rdv))
        .catch((err) => res.status(500).send(err));
}
//controleur pour afficher la page de prise rdv

 export const PageRdv= async ( req,res)=>{
     res.sendFile("view/patients/formrdv.html", { root: dirname("view") });
 }

 // controleur poour afficher la page des psy
 export const Pagepsy= async (req, res) => {
    res.sendFile("view/patients/patients.viewpsy.html", { root: dirname("view") });
 }