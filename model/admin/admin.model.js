import { Schema, model } from "mongoose";

const AdminSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    role: String,
    psychologue: [
      {
        name: String,
        email: String,
        phone: String,
        role: String,
        password: String,
        specialite: String,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

export const AdminModel = model("admin", AdminSchema);
