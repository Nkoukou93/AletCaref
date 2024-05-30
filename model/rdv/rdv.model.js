import { Schema, model } from "mongoose";

const RdvSchema= new Schema({
    
    patient:{type: Schema.Types.ObjectId, ref: "patients"},  //Lien vers le profil du patient qui a pris rendez-vous
    psy:{type: Schema.Types.ObjectId, ref: "psy"},  //Lien vers le profil du psy qui a pris rendez-vous
    admin:{type: Schema.Types.ObjectId, ref: "admin"},  //Lien vers le profil du patient qui a pris rendez-vous
   date: { type: Date, default: new Date() },
   libelle: {type:String},
   status: { type: String, default: "En attente"},
   
},
{ timestamps: true }
);
export const RdvModel = model("rdv", RdvSchema);

