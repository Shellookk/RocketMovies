// Imponrtando arquivos
const { Router } = require("express");
const TagsMoviesController = require("../controllers/TagsMoviesController");

// Inicializando
const movieTagsRoutes = Router();
const tagsMoviesController = new TagsMoviesController();

// Funcções


//Criação de usuário
movieTagsRoutes.get("/:user_id", tagsMoviesController.index);
// Exportando 
module.exports = movieTagsRoutes;