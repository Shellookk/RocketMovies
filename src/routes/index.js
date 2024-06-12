// Importando arquivos
const { Router } = require("express");
const usersRoutes = require("./users.routes");
const movie_notesRoutes = require("./movie_notes.routes");

// Inicialização das rotas
const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/movie_notes', movie_notesRoutes);
module.exports = routes;