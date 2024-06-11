// Importando arquivos
const { Router } = require("express");
const usersRoutes = require("./users.routes");

// Inicialização das rotas
const routes = Router();
routes.use('/users', usersRoutes);


module.exports = routes;