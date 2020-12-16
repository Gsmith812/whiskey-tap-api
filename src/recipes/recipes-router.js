const path = require('path');
const express = require('express');
const xss = require('xss');
const RecipesService = require('./recipes-service');

const recipesRouter = express.Router();
const jsonParser = express.json();

recipesRouter
    .route('/whiskey_types')
    .get((req, res, next) => {
        RecipesService.getWhiskeyTypes(
            req.app.get('db')
        )
            .then(whiskey_types => {
                res.status(200).json(whiskey_types.rows[0].enum_range)
            })
            .catch(next);
    });

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


module.exports =  recipesRouter;