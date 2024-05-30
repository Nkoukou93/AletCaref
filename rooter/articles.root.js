import { Router } from "express";
import { ArticlesModel } from "../model/articles/articles.model.js";

export const Articlesroot=Router();

// route pour recuperer les articles dans la base de données
Articlesroot.get("/",async(req,res)=>{
    try{
        const articles = await ArticlesModel.find();
        res.send(articles);
    }catch(error){
        res.send(error);
    }
})

//route pour ajouter un article à la base de données
Articlesroot.post('/', async (req, res) => {
    const article = new ArticlesModel(req.body);
    article
      .save()
      .then(() => res.send(article))
      .catch((err) => res.status(500).send(err));
  });

  //route pour supprimer un article par son id
  Articlesroot.delete('/:id', async (req, res) => {
    try {
      const article = await ArticlesModel.findByIdAndDelete(req.params.id);
      res.send(article);
    } catch (err) {
      res.status(500).send(err);
    }
  })

  // route pour mettre à jour un article par son id
  Articlesroot.put("/:id", async (req, res) => {
    try {
      const article = await ArticlesModel.findByIdAndUpdate(req.params.id,req.body);
      res.send(article);
    } catch (err) {
      res.status(500).send(err);
    }
  })