const CommentsService = {
    getCommentByRecipeId(knex, recipe_id) {
        return knex('recipe_comments')
            .select('recipe_comments.*' , 'users.first_name as user_name')
            .join('users', 'recipe_comments.user_id', '=', 'users.id')
            .where({ recipe_id })
    },
    insertNewComment(knex, newComment) {
        return knex
            .insert(newComment)
            .into('recipe_comments')
            .returning('*')
            .then(rows => {
                return rows[0];
            })
    },
    getCommentByCommentId(knex, comment_id) {
        return knex
            .select('*')
            .from('recipe_comments')
            .where('id', comment_id)
            .first();
    },
    deleteComment(knex, comment_id) {
        return knex('recipe_comments')
            .where('id', comment_id)
            .delete()
    },
}

module.exports = CommentsService;