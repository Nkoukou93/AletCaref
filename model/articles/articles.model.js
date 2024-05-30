import { Schema, model } from "mongoose";

const ArticlesSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "psy" }, // 这个是一篇文
  date: { type: Date, default: new Date() },
  image: String,
  nbvues: { type: Number, default: 0 }, // nombre de vues

  psychologue: [
    {
      name: String,
      email: String,
      specialite: String,
      image: String,
    },
  ],
},
{ timestamps: true }

);
export const ArticlesModel = model("articles", ArticlesSchema)