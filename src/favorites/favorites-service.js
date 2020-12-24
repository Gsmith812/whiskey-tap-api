const FavoritesService = {
    getFavoritesByUser(knex, user_id) {
        return knex
            .from('favorite_recipes')
            .select('*')
            .where({user_id})
    },
    insertFavorite(knex, newFav) {
        return knex
            .insert(newFav)
            .into('favorite_recipes')
            .returning('*')
            .then(rows => rows[0])
    },
    getFavoritesByFavId(knex, id) {
        return knex
            .select('*')
            .from('favorite_recipes')
            .where({ id })
            .first()
    },
    deleteFavorite(knex, id) {
        return knex('favorite_recipes')
            .where({ id })
            .delete()
    }
}

module.exports = FavoritesService;