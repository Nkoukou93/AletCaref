import { Router } from "express";
import { RdvModel } from "../model/rdv/rdv.model.js";


export const Rdvroot = Router();

//route pour ajouter un rendez-vous à la base de données
Rdvroot.post("/addrdv", async (req, res) => {
    const rdv = new RdvModel(req.body);
    rdv
        .save()
        .then(() => res.send(rdv))
        .catch((err) => res.status(500).send(err));
})

//route pour récupérer tous les rendez-vous dans la base de données
Rdvroot.get('/getallrdv', async (req, res) => {
    try {
        const rdvs = await RdvModel.find();
        res.send(rdvs);
    } catch (err) {
        res.status(500).send(err);
    }
})
//route pour supprimer un rendez-vous par son id
Rdvroot.delete('/deleterdv/:id', async (req, res) => {
    try {
        const rdv = await RdvModel.findByIdAndDelete(req.params.id);
        res.send(rdv);
    } catch (err) {
        res.status(500).send(err);
    }
})

//route pour modifier un rendez-vous par son id
Rdvroot.put('/updaterdv/:id', async (req, res) => {
    try {
        const rdv = await RdvModel.findByIdAndUpdate(req.params.id, req.body);
        res.send(rdv);
    } catch (err) {
        res.status(500).send(err);
    }
})