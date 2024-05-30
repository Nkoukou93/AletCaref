import { Schema, model } from "mongoose";

const PsySchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    specialite: String,
    image: String,
    role: String,
    phone: String,
    document: String,
    statut: { type: String, default: "en attente" }, // en attente | approuvé | rejeté
    rdv_count: Number,
    rdv_approved_count: Number,
    rdv_rejected_count: Number,
    patients: [
      {
        name: String,
        email: { type: String, required: true, unique: true },
        password: String,
        role: String,
        phone: String,
        image: String,
        dateOfBirth: Date,
      },
    ],

    article: [
      {
        title: { type: String, default: "" },
        image: { type: String, default: "" },
        content: { type: String, default: "" },
        date: { type: Date, default: new Date() },
        nombredevue: { type: Number, default: 0 },
        psychologue: [
          {
            name: String,
            email: String,
            role: String,
            password: String,
            specialite: String,
            image: String,
          },
        ],
      },
    ],

    description: { type: String, default: "" },
  },
  { timestamps: true }
);
export const PsyModel= model("psy",PsySchema);
    
