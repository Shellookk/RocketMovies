//Importações
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesMoviesController{
    async create(request, response){
        const { title, description, movie_tags, rating }  = request.body;
        const { user_id } = request.params;

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id,
        });

        const movieTagsInsert = movie_tags.map(name =>{
            return {
                note_id,
                name,
                user_id
            }
        });
        await knex("movie_tags").insert(movieTagsInsert);

        response.json();
    };

    async show(request, response){
        const { id } = request.params;
        const movie_note = await knex("movie_notes").where({ id }).first();
        const movie_tags = await knex("movie_tags").where({ note_id: id }).orderBy("name");

        return response.json({
            ...movie_note,
            movie_tags
        });        
    };

    async update(request, response){
        
    }

    async delete(request, response){
        const { id } = request.params;
        
        await knex("movie_notes").where({ id }).delete();

        return response.json()
    };



};

module.exports = NotesMoviesController;