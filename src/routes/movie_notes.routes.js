// Imponrtando arquivos
const { Router } = require("express");
const NotesMoviesController = require("../controllers/NotesMoviesController");


// Inicializando
const movieNotesRoutes = Router();
const notesMoviesController = new NotesMoviesController();

// Funcções



//Criação de usuário
movieNotesRoutes.get("/", notesMoviesController.index);
movieNotesRoutes.post("/:user_id", notesMoviesController.create); // criar
movieNotesRoutes.get("/:id", notesMoviesController.show); // visualizar
movieNotesRoutes.delete("/:id", notesMoviesController.delete); // deletar
// Exportando 
module.exports = movieNotesRoutes;