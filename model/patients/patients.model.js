import { Schema, model } from "mongoose";

 const PatientsSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: String,
  phone: String,
  image: String,
  dateOfBirth: Date,
  rdv: [
    {
      date: Date,
      libelle: String,
      status: String, // Enum ["Pending", "Accepted", "Rejected"]
      psychologue:[
        {
          name: String,
          email: String,
          specialite: String,
          image: String,
        }
      ]
    },
  ],

},
{ timestamps: true });

export const PatientsModel = model("patients", PatientsSchema);
   