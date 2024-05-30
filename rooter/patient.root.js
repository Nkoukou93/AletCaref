import { Router } from "express";
import { PageRdv, Pagepsy, addPatient, getAllPatients, logOut, login, makeAppointment, showMyRDV } from "../controllers/patients/patients.controlor.js";
import { Rootadmin } from "./admin.root.js";


export const Rootpatient = Router();
Rootpatient.post("/register",addPatient);  //Ajout d'un patient à la BDD

//route pour recuperer le patient dans la base de donnée

Rootpatient.post("/login", login)

//route pour see deconnecter
Rootpatient.get("/logout", logOut)

//route pour prendre un rdv

Rootpatient.post("/rdv",makeAppointment)
//route pour afficher la page de prise de rdv

Rootpatient.get("/appointments",PageRdv),
//route pour afficher les rdv

Rootpatient.get("/myrdv",showMyRDV)

// route pour afficher la ^page des psy

Rootpatient.get("/psy", Pagepsy)

// route pour afficher tous les patients

Rootpatient.get("/allpatients",getAllPatients)

// // route pour recuperer les patients dans la base de données
// Rootpatient.get("/",async (req,res)=>{
//     try{
//         const patients = await PatientsModel.find();
//         res.send(patients);
//     }catch(error){
//         res.send(error);
//     }
    
// });

// // route pour recuperer un patient par son mot de passe et son email
// Rootpatient.post('/login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const patient = await PatientsModel.findOne({ email, password });
//       if (!patient) {
//         return res.status(401).send('Email ou mot de passe incorrect');
//       }
//       res.send(patient);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });


// // route pour poster les patients
// Rootpatient.post('/addpatients', (req, res) => {
//     const patient = new PatientsModel(req.body);
//     patient
//       .save()
//       .then(() => res.send(patient))
//       .catch((err) => res.status(500).send(err));
//   });
//   //route pour supprimer un patient par son id
//   Rootpatient.delete('/:id', async (req, res) => {
//     try {
//       const patient = await PatientsModel.findByIdAndDelete(req.params.id);
//       res.send(patient);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });
//   // route pour mettre à jour un patients par son nom et son email
//   Rootpatient.put("/update/:id", async (req, res) => {
//     try {
//       const patient = await PatientsModel.findByIdAndUpdate(
//         req.params.id,
//         req.body
//       );
//       res.send(patient);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });
