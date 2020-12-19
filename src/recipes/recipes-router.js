const path = require('path');
const express = require('express');
const xss = require('xss');
const RecipesService = require('./recipes-service');

const recipesRouter = express.Router();
const jsonParser = express.json();

recipesRouter
    .route('/')
    .get((req, res, next) => {
        RecipesService.getAllRecipes(req.app.get('db'))
            .then(recipes => {
                res.json(recipes)
            })
            .catch(next);

    })
    .post(jsonParser, async (req, res, next) => {
        const { cocktail_name, cocktail_type, whiskey_type, description , created_by, ingredients, cocktail_steps } = req.body;
        const newRecipe = { cocktail_name, cocktail_type, whiskey_type, created_by };
        const knex = req.app.get('db');
        for(const [key, value] of Object.entries(newRecipe)) {
            if(value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }
        newRecipe.description = description;

        const recipeItem  = await RecipesService.insertRecipe(
            knex,
            newRecipe
        )
            .then(recipe => {
                res.recipe = recipe
                return recipe
            })
            .catch(next);

        const ingredientsList = await ingredients.map(ingredient => {
            ingredient.recipe_id = recipeItem.id
            RecipesService.insertIngredients(
                knex,
                ingredient
            )
                .then(ingredient => {
                    res.ingredients = {...res.ingredients, ingredient}
                    return ingredient
                })
                .catch(next);
        });
        const cocktailStepsList = await cocktail_steps.map(step => {
            step.recipe_id = recipeItem.id;
            RecipesService.insertCocktailSteps(
                knex,
                step
            )
                .then(step => {
                    res.cocktail_steps = {...res.cocktail_steps ,step}
                    return step
                })
                .catch(next);
        });
        res
            .status(201)
            .location(path.posix.join(req.originalUrl + `/${newRecipe.id}`))
            .json(recipeItem);
    
    }
    );

recipesRouter
    .route('/:recipeId')
    .all((req, res, next) => {
        RecipesService.getRecipeById(
            req.app.get('db'),
            req.params.recipeId
        )
            .then(recipe => {
                if(!recipe) {
                    return res.status(404).json({
                        error: { message: `Recipe does not exist` }
                    })
                }
                res.recipe = recipe;
                next();
            })
    })
    .get(async (req, res, next) => {
        let recipe = res.recipe;
        const ingredientsList = await RecipesService.getIngredients(
            req.app.get('db'),
            req.params.recipeId
            )
                .then(ingredients => { 
                    return ingredients
                })
                .catch(next);
        const cocktailStepsList = await RecipesService.getCocktailSteps(
            req.app.get('db'),
            req.params.recipeId
            )
                .then(cocktailSteps => {
                    return cocktailSteps 
                })
                .catch(next);
        recipe = {...recipe, ingredients: ingredientsList, cocktail_steps: cocktailStepsList};
        res.json(recipe);  
    })
    .delete((req, res, next) => {
        RecipesService.deleteRecipe(
            req.app.get('db'),
            req.params.recipeId
        )
            .then(() => {
                res.status(204).end();
            })
            .catch(next);
    })
    .patch(jsonParser, (req, res, next) => {
        const { cocktail_name, cocktail_type, whiskey_type, description , created_by, ingredients, cocktail_steps, ingredientIdsToRemove, cocktailStepIdsToRemove } = req.body;
        const recipeToUpdate = { cocktail_name, cocktail_type , whiskey_type, description, created_by };

        const numberOfValues = Object.values(recipeToUpdate).filter(Boolean).length;
        if(numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain at least one updated field.`
                }
            })
        }

       RecipesService.updateRecipe(
            req.app.get('db'),
            req.params.recipeId,
            recipeToUpdate
        )
            .then(recipe => {
                return recipe
            })
            .catch(next);

        ingredients.map(ingredient => {
            if(!ingredient.id) {
                RecipesService.insertIngredients(
                    req.app.get('db'),
                    ingredient
                )
                    .then(ingredient => {
                        return ingredient
                    })
                    .catch(next);
            }
            else {
                RecipesService.updateIngredients(
                    req.app.get('db'),
                    ingredient.id,
                    ingredient
                )
                    .then(ingredient => {
                        return ingredient
                    })
                    .catch(next);
            }
        })

        cocktail_steps.map(step => {
            if(!step.id) {
                RecipesService.insertCocktailSteps(
                    req.app.get('db'),
                    step
                )
                    .then(step => {
                        return step
                    })
                    .catch(next);
            }
            else {
                RecipesService.updateCocktailSteps(
                    req.app.get('db'),
                    step.id,
                    step
                )
                    .then(step => {
                        return step
                    })
                    .catch(next);
            }
        })

        if(ingredientIdsToRemove) {
            ingredientIdsToRemove.map(id => {
                RecipesService.deleteIngredient(
                    req.app.get('db'),
                    id
                )
                    .then(numRowsAffected => {
                        console.log(numRowsAffected + `deleted`)
                    })
                    .catch(next);
            })
        }

        if(cocktailStepIdsToRemove) {
            cocktailStepIdsToRemove.map(id => {
                RecipesService.deleteCocktailStep(
                    req.app.get('db'),
                    id
                )
                .then(numRowsAffected => {
                    console.log(numRowsAffected + `deleted`)
                })
                .catch(next);
            })
        }

        res.status(204).end();

    })


module.exports =  recipesRouter;