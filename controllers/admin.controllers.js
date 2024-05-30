import { log } from "node:console";
import { AdminModel } from "../model/admin/admin.model.js";
import { PsyModel } from "../model/psy/psy.model.js";
import { RdvModel } from "../model/rdv/rdv.model.js";
import { dirname } from "node:path";
import { PatientsModel } from "../model/patients/patients.model.js";


export const pageaccueiladmin = async (req, res) => {
  res.sendFile("view/admin/admin.view.html", { root: dirname("view") });
};

//controleur poour recuper un psy par son id

export const getOnePsy = async (req, res) => {
  try {
    const psy = await PsyModel.findById(req.params.id);
    res.send(psy);
  } catch (err) {
    res.status(500).send(err);
  }
}
export const connexionAdmin = (req, res) => {
  res.sendFile("view/admin/admin.view.log.html", { root: dirname("view") });
};

//connexion de l'administrateur
export const adminConnexion = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const admin = await AdminModel.findOne({ email, password });
    if (!admin) {
      res.redirect("/admin");
    } else {
      req.session.admin = admin._id;
      // res.status(200).send(admin);
      res.sendFile("view/admin/admin.view.dashboard.html", {
        root: dirname("view"),
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
// se deconnecter et detruire la session
export const logoutadmin = (req, res) => {
  // res.redirect("/admin");
  req.session.destroy((err) => {
     if (err) {
       console.error("Erreur lors de la destruction de la session :", err);
      return res.status(500).send("Erreur lors de la déconnexion");
     }
     //Redirection vers la page de connexion
     res.redirect("/admin");
  });
};

//controleur pour voir tous les psy
export const getAllPsychologists = async (req, res) => {
  try {
    const psys = await PsyModel.find();
    res.send(psys);
  } catch (error) {
    res.send(error);
  }
};
//controleur pour afficher la page des psy uniquement quand l'admin est connecté
export const Pagepsy= async (req, res) => {
  //   if (!req.session.admin) {
  //   return res.status(401).send('Accès non autorisé. Veuillez vous connecter en tant qu\'administrateur.');
  // }
  res.sendFile("view/admin/admin.view.psy.html", { root: dirname("view") });
};



//controleur pour approuver un psy
export const approvePsy = async (req, res) => {
//   if (!req.session.admin) {
//     return res
//       .status(401)
//       .send(
//         "Accès non autorisé. Veuillez vous connecter en tant qu'administrateur."
//       );
//   }
    const { id } = req.params;

    try {
        const updatedPsy = await PsyModel.findByIdAndUpdate(
            id,
            { statut: "approuvé" }, // Mettre à jour le statut à "approuvé"
            { new: true }
        );

        if (!updatedPsy) {
            return res.status(404).json({ message: "Psychologue non trouvé" });
        }

        return res.status(200).json({ message: "Psychologue approuvé avec succès", psy: updatedPsy });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de l'approbation du psychologue" });
    }
};
//controleur pour rejeter un psy
export const rejectPsy = async (req, res) => {
  
   if (!req.session.admin) {
   return res
      .status(401)
      .send(
        "Accès non autorisé. Veuillez vous connecter en tant qu'administrateur."
       );
   }
    const { id } = req.params;
    
    
    try{
      const deletepsy     = await PsyModel.findByIdAndDelete(id);
      
      if(!deletepsy){
        return res.status(404).json({ message: "Psychologue non trouvé" });
      }
      return res.status(200).json({ message: "Psychologue supprimé avec succès", psy: deletepsy });
    }catch(e){
      console.error(e);
      return res.status(500).json({ message: "Erreur lors de la suppression du psy" });
    }
}
//controleur pour afficher les fichiers sous forme d'image et non de lien

export const showImage = async (req, res) => {
  if (!req.session.admin) {
    return res
      .status(401)
      .send(
        "Accès non autorisé. Veuillez vous connecter en tant qu'administrateur."
      );
  }
  try {
    const psy = await PsyModel.findById(req.params.id);
    if (!psy) {
      return res.status(404).send("Psychologue non trouvé");
    }
    res.sendFile(psy.image, { root: dirname("public") });
  } catch (error) {
    res.status(500).send(error);
  }
}
//controleur pour affiche tous les psy avec statut approuvé à partir de l'ID du psychologue

export const getAllApprovedPsychologists = async (req, res) => {
  // // if (!req.session.admin) {
  //   return res
  //     .status(401)
  //     .send(
  //       "Accès non autorisé. Veuillez vous connecter en tant qu'administrateur."
  //     );
  // }
  try {
    const psys = await PsyModel.find({ statut: "approuvé" });
    res.send(psys);
  } catch (error) {
    res.send(error);
  }
}


// export const getAllApprovedPsychologists = async (req, res) => {
//   if (!req.session.admin) {
//     return res
//       .status(401)
//       .send(
//         "Accès non autorisé. Veuillez vous connecter en tant qu'administrateur."
//       );
//   }
//   try {
//     const psys = await PsyModel.find({ statut: "approuvez" });
//     res.send(psys);
//   } catch (error) {
//     res.send(error);
//   }
// }

//controleur pour afficher la page de modification du statut des psy
export const showModifyStatusPage = (req, res) => {
  // if (!req.session.admin) {
  //   return res
  //     .status(401)
  //     .send(
  //       "Accès non autorisé. Veuillez vous connecter en tant qu'administrateur."
  //     );
  // }
  res.sendFile("view/admin/admin.modicationstatut.html", {
    root: dirname("view"),
  });
}

//route pour afficher tous les patients
export const getAllpatients= async (req, res) => {
  try {
    const patients = await PatientsModel.find();
    res.send(patients);
  } catch (err) {
    res.status(500).send(err);
  }
}

