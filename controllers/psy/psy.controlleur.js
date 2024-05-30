import { PsyModel } from "../../model/psy/psy.model.js";
import path from "path";

import{ dirname } from "node:path";
import { RdvModel } from "../../model/rdv/rdv.model.js";
import multer from "multer";

//controleur pour recuperer tous les psys 
export const getPsyById = async (req, res) => {
    try {
        const psy = await PsyModel.findById(req.params.id);
        res.send(psy);
    } catch (error) {
        res.send(error);
    }
}
//controleur pour acceder à la page d'accueil des psys
export const psyhome = async (req, res) => {
    res.sendFile('view/psychologues/psy.view.html',{root:dirname("view")})
}
//controleur pour acceder au formulaire d'inscription de psychologue
export const getAddPsyForm = async (req, res) => {
    res.sendFile('view/psychologues/psyform.html',{root:dirname("view")})
}

//controleur pour le formulaire de connexion
export const getConnexionForm = (req, res) => {
    res.sendFile('view/psychologues/psy.view.signin.html',{root:dirname("view")})
}
// ajouter un psy 
export const addPsy = async (req, res) => {
    
    const psy = new PsyModel(req.body);
    try {
        await psy.save();
        res.send(psy);
    } catch (error) {
        res.send(error);
    }
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "public/");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage });
}




//recuperer un psy par son email et mot de passe

export const loginPsy = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const psy = await PsyModel.findOne({ email, password });
        if (!psy) {
            res.redirect("/psy/register");
        } else {
            req.session.psy = psy._id;
            res.sendFile("view/psychologues/psy.view.dashboard.html", {
                root: dirname("view"),
            });
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

//     try {
//         const { email, password } = req.body;
//         console.log(req.body);
//         const psy = await PsyModel.findOne({ email, password });
//         if (!psy) {
//             res.redirect("/psy/register");
//         }
//         else {
//              req.session.psy = psy._id;
        
//       res.sendFile("view/psychologues/psy.view.dashboard.html", dirname("view")), {
       
//         }
//         }
//     } catch (e) {
//         res.status(500).send(e);
//     }
// };
       
  

//controleur pour voir tous les rdv pris par un psy
export const getAllRDVByPsy = async (req, res) => {
    //  if (!req.session.psy) {
    //    return res
    //      .status(401)
    //      .send(
    //        "Accès non autorisé. Veuillez vous connecter en tant qu'administrateur."
    //      );
    //  }
    try {
        const rdvs = await RdvModel.find();
        res.send(rdvs);
    } catch (err) {
        res.status(500).send(err);
    }
}

//controleur pour chercher un psy par son email et mot de passe

export const searchPsyByMailAndPassword = async (req, res) => {
    try {
        const { email,name, specailite} = req.body;
        const psy = await PsyModel.findOne({ email,name,specailite });
        if (!psy) {
            return res.status(401).send('Email ou mot de passe incorrect');
        }
        res.send(psy);
    } catch (err) {
        res.status(500).send(err);
    }
}

//controleur pour se deconnecter
export const logoutPsy = (req, res) => {
    // res.redirect("/psy");
    req.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la destruction de la session :", err);
            return res.status(500).send("Erreur lors de la déconnexion");
        }
        // Redirection vers la page de connexion
        res.redirect("/psy");
    });
}

//controleur pour recuperer tous les psy approuvé par l'administrateur

export const getAllpsy = async (req, res) => {
    try {
        const psys = await PsyModel.find({ statut: "approuvé" });
        res.send(psys);
    } catch (error) {
        res.send(error);
    }
}

//controleur pour recuperer la photo du psy a partir de l'url de la photo

export const getPsyPhoto = async (req, res) => {
    try {
        // Recherchez le psy dans la base de données en fonction du nom de fichier
        const psy = await PsyModel.findOne({ photo_url: req.params.filename });

        // Vérifiez si le psy existe et s'il a une image associée
        if (!psy || !psy.photo_url) {
            return res.status(404).json({ message: "Psy non trouvé ou image non disponible" });
        }

        // Renvoyer l'image
        res.sendFile(path.resolve(`public/${psy.photo_url}`));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération de l'image du psy" });
    }
}



// export const getPsyPhoto = async (req, res) => {
//     try {
//         const psy = await PsyModel.findById(req.params.id);
//         res.send(psy.image);
//     } catch (error) {
//         res.send(error);
//     }
// }

//  export const getAllpsy = async (req, res) => {
    
//     try {
//         const psys = await PsyModel.find();
        
//         res.send(psys);
//     } catch (error) {
//         res.send(error);
//     }
//  }