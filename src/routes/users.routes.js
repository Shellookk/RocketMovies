// Imponrtando arquivos
const { Router } = require("express");
const UsersController = require("../controllers/UsersController");


// Inicializando
const usersRoutes = Router();
const usersController = new UsersController();

// Funcções



//Criação de usuário
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

// Exportando 
module.exports = usersRoutes;