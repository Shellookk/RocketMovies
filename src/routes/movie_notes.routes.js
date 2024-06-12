// Imponrtando arquivos
const { Router } = require("express");
const NotesMoviesController = require("../controllers/NotesMoviesController");


// Inicializando
const movieNotesRoutes = Router();
const notesMoviesController = new NotesMoviesController();

// Funcções



//Criação de usuário
movieNotesRoutes.post("/:user_id", notesMoviesController.create);

// Exportando 
module.exports = movieNotesRoutes;