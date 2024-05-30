import {dirname} from "node:path";


export const acceuil = async (req, res)=>{
    console.log(req.session);
    res.sendFile('view/index.html',{root:dirname("view")});
};
//affichage de la page de connexion
export const connexionPatient = async (req, res) => {
    res.sendFile('view/patients/patientssignin.html',{root:dirname("view")});
}

//Affichahge de la page d'enregistrement

export const register = async(req,res)=>{
    res.sendFile('view/patients/patientsviewlog.html',{root:dirname("view")});
}
//Affichage de la page des psy
export const psychologues = async (req, res) => {
    res.sendFile('view/psychologues/psy.view.html',{root:dirname("view")});
}
export const articles = async  (req, res) => {
    res.sendFile('view/articles/articles.view.html',{root:dirname("view")});
}
export const enregister =async (req, res) => {
    res.sendFile('view/patients/patientsignup.html',{root:dirname("view")});
    
}
export const login = async (req, res) => {
    res.sendFile('view/patients/patientsignin.html',{root:dirname("view")});
}