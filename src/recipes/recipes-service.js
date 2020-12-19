

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
    deleteRecipe(knex, id) {
        return knex('recipes')
            .where({ id })
            .delete()
    },
    deleteIngredient(knex, id) {
        return knex('ingredients')
            .where({ id })
            .delete()
    },
    deleteCocktailStep(knex, id) {
        return knex('cocktail_steps')
            .where({ id })
            .delete()
    },
    updateRecipe(knex, id, newRecipeFields) {
        return knex('recipes')
            .where({ id })
            .update(newRecipeFields)
    },
    updateIngredients(knex, id, newIngredientFields) {
        return knex('ingredients')
            .where({ id })
            .update(newIngredientFields)
    },
    updateCocktailSteps(knex, id, newCocktailStepFields) {
        return knex('cocktail_steps')
            .where({ id })
            .update(newCocktailStepFields)
    }
}

module.exports = RecipesService;