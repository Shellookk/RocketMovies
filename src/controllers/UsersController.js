// Exportações
const { compare, hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController{
    async create(request, response){
        const { name, email, password } = request.body;
        const database = await sqliteConnection();

        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (checkUserExists){
            throw new AppError("Este e-mail já está cadastrado!", 409);
        };
        if(!name){
            throw new AppError("O nome é obrigatório!", 400);
        };
        if(!email){
            throw new AppError("O e-mail é obrigatório!", 400);
        };
        if(!password){
            throw new AppError("A senha é obrigatória!", 400);
        }

        const hashedPassword = await hash(password, 8)

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        return response.status(201).json();
    }

    async update(request, response){
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;
        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if (!user){
            throw new AppError("Usuário não encontrado!", 404);
        };

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso.");
        };
      
        user.name = name ??  user.name;
        user.email= email ?? user.email; // ?? operador null ele verifica se um dos dois estão vazios e adiciona o que tem algo.

        if( password && !old_password){
             throw new AppError("Digite a senha antiga para criar um nova senha!",400);
        };

        if( password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere!", 400)
            };

            user.password = await hash(password, 8);
        };


      
        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`, 
            [user.name, user.email, user.password, id]
        );

        return response.status(200).json();
    };
};
module.exports = UsersController;