const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');
const { makeRecipesArray } = require('./recipes.fixtures');
const { makeUsersArray } = require('./users.fixtures');

describe(`Recipes Endpoints`, () => {
    let db;

    before(`make knex instance`, () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db);
    })

    after('disconnect from db', () => db.destroy());

    before(`clean the tables`, () => db.raw(`TRUNCATE recipes, users RESTART IDENTITY CASCADE`));

    afterEach(`cleanup`, () => db.raw(`TRUNCATE recipes, users RESTART IDENTITY CASCADE`));

    describe(`GET /api/recipes`, () => {
        context(`Given no recipes`, () => {
            it(`responds with 200 and an empty array`, () => {
                return supertest(app)
                    .get(`/api/recipes`)
                    .expect(200, [])
            });
        });
        context(`Given there are articles and users in database`, () => {
            const testUsers = makeUsersArray();
            const { recipes, expectedRecipeList } = makeRecipesArray();

            beforeEach(`insert recipes and users`, () => {
                return db
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('recipes')
                            .insert(recipes)
                    })
            });

            afterEach(`cleanup`, () => db.raw(`TRUNCATE recipes, users RESTART IDENTITY CASCADE`));

            it(`GET /api/articles responds with 200 and all of the articles in the table with a user field`, () => {
                return supertest(app)
                    .get(`/api/recipes`)
                    .expect(200, expectedRecipeList)
            });
        });
    });

    describe(`POST /api/recipes`, () => {
        const testUsers = makeUsersArray();

        beforeEach(`insert recipes and users`, () => {
            return db
                .into('users')
                .insert(testUsers)
        });

        it(`creates a recipe with ingredients and steps responding with 201 and the recipe item`, function () {
            this.retries(3)
            const { newRecipe, expectedNewRecipe } = makeRecipesArray();
            return supertest(app)
                .post(`/api/recipes`)
                .send(newRecipe)
                .expect(201)
                .expect(res => {
                    expect(res.body.id).to.eql(expectedNewRecipe.id)
                    expect(res.body.cocktail_name).to.eql(expectedNewRecipe.cocktail_name)
                    expect(res.body.cocktail_type).to.eql(expectedNewRecipe.cocktail_type)
                    expect(res.body.whiskey_type).to.eql(expectedNewRecipe.whiskey_type)
                    expect(res.body.description).to.eql(expectedNewRecipe.description)
                    expect(res.body.created_by).to.eql(expectedNewRecipe.created_by)
                });

        });
    });

    describe(`GET /api/recipes/:recipeId`, () => {
        context(`Given no recipes`, () => {
            it(`responds with 404`, () => {
                const recipeId = 1234;
                return supertest(app)
                    .get(`/api/recipes/${recipeId}`)
                    .expect(404, { error: { message: `Recipe does not exist`}})
            });
        });

        context(`Given there are recipes in the db`, () => {
            const testUsers = makeUsersArray();
            const { newRecipe, testRecipe, testIngredients, testSteps } = makeRecipesArray();
            
            beforeEach(`insert recipes/ingredients/steps/users`, () => {
                return db
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('recipes')
                            .insert(testRecipe)
                            .then(() => {
                                return db
                                    .into('ingredients')
                                    .insert(testIngredients)
                            })
                            .then(() => {
                                return db
                                    .into('cocktail_steps')
                                    .insert(testSteps)
                            })
                    })
            });

            it(`responds with 200 and the specified recipe`, () => {
                const recipeId = 1;
                return supertest(app)
                    .get(`/api/recipes/${recipeId}`)
                    .expect(200, newRecipe)
            });
        })
    });

    describe(`DELETE /api/recipes/:recipeId`, () => {
        context(`Given no recipes`, () => {
            it(`responds with 404`, () => {
                const recipeId = 1234;
                return supertest(app)
                    .delete(`/api/recipes/${recipeId}`)
                    .expect(404, { error: { message: `Recipe does not exist` }})
            });
        });

        context(`Given there are recipes in the db`, () => {
            const testUsers = makeUsersArray();
            const { recipes, expectedRecipeList } = makeRecipesArray();

            beforeEach(`insert users and recipes`, () => {
                return db
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('recipes')
                            .insert(recipes)
                    })
            });

            it(`responds with 204 and removes the recipe`, () => {
                const idToRemove = 3;
                const expectedRecipes = expectedRecipeList.filter(recipe => recipe.id !== idToRemove);
                return supertest(app)
                    .delete(`/api/recipes/${idToRemove}`)
                    .expect(204)
                    .then(res => 
                        supertest(app)
                            .get(`/api/recipes`)
                            .expect(expectedRecipes)
                    );
            });
        });
    });

    describe(`PATCH /api/recipes/:recipeId`, () => {
        context(`Given no recipes`, () => {
            it(`responds with 404`, () => {
                const recipeId = 1234;
                return supertest(app)
                    .patch(`/api/recipes/${recipeId}`)
                    .expect(404, { error: { message: `Recipe does not exist` }})
            });
        });

        context(`Given there are recipes and users in the db`, () => {
            const testUsers = makeUsersArray();
            const { testRecipe, testIngredients, testSteps, newRecipe } = makeRecipesArray();

            beforeEach(`insert recipes/ingredients/steps/users`, () => {
                return db
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('recipes')
                            .insert(testRecipe)
                            .then(() => {
                                return db
                                    .into('ingredients')
                                    .insert(testIngredients)
                            })
                            .then(() => {
                                return db
                                    .into('cocktail_steps')
                                    .insert(testSteps)
                            })
                    })
            });

            it(`responds with 204 and updates the recipe`, () => {
                const idToUpdate = 1;
                const updateRecipe = {
                    ...newRecipe,
                    cocktail_name: 'Updated Name',
                    description: 'Updated description',
                };
                const expectedRecipe = {
                    ...newRecipe,
                    ...updateRecipe
                }

                return supertest(app)
                    .patch(`/api/recipes/${idToUpdate}`)
                    .send(updateRecipe)
                    .expect(204)
                    .then(res => 
                        supertest(app)
                            .get(`/api/recipes/${idToUpdate}`)
                            .expect(expectedRecipe)
                    )
            });
        });
    });
});