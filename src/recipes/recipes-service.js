

const RecipesService = {
    getAllRecipes(knex) {
        return knex('recipes')
            .join('users', 'recipes.created_by', '=', 'users.id')
            .select('recipes.*', 'users.first_name as user')
    },
    getRecipeById(knex, id) {
        return knex('recipes')
            .join('users', 'recipes.created_by', '=', 'users.id')
            .select('recipes.*', 'users.first_name as user')
            .where('recipes.id', id)
            .first();      
    }, 
    getIngredients(knex, recipe_id) {
        return knex('ingredients')
            .select('*')
            .where({ recipe_id })
    },
    getCocktailSteps(knex, recipe_id) {
        return knex('cocktail_steps')
            .select('*')
            .orderBy('step_number')
            .where({ recipe_id })
    },
    insertRecipe(knex, newRecipe) {
        return knex
            .insert(newRecipe)
            .into('recipes')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },
    insertIngredients(knex, newIngredients) {
        return knex
            .insert(newIngredients)
            .into('ingredients')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },
    insertCocktailSteps(knex, newSteps) {
        return knex
            .insert(newSteps)
            .into('cocktail_steps')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },
    getAllIngredients(knex) {
        return knex('ingredients')
            .select('*')
    },
    getAllCocktailSteps(knex) {
        return knex('cocktail_steps')
            .select('*')
    },
    getAllRecipeComments(knex) {
        return knex('recipe_comments')
            .select('*')
    },
    getAllUsers(knex) {
        return knex('users')
            .select('*')
    },
    getCocktailTypes(knex) {
        return knex.raw(`SELECT enum_range(NULL::cocktail_glass)`)
    },
    getWhiskeyTypes(knex) {
        return knex.raw(`SELECT enum_range(NULL::whiskey_name)`)
    }
}

module.exports = RecipesService;