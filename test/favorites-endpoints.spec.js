const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');
const { makeUsersArray } = require('./users.fixtures');
const { makeRecipesArray } = require('./recipes.fixtures');
const { makeFavoritesArray } = require('./favorites.fixtures');

describe(`Favorites Endpoints`, () => {
    let db;

    before(`make knex instance`, () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db);
    });

    after(`disconnect from db`, () => db.destroy());

    before(`clean the tables`, () => db.raw(`TRUNCATE users, recipes, favorite_recipes RESTART IDENTITY CASCADE`));

    afterEach(`cleanup`, () => db.raw(`TRUNCATE users, recipes, favorite_recipes RESTART IDENTITY CASCADE`));

    describe(`GET /favorites/:user_id`, () => {
        context(`Given the user has no favorites`, () => {
            const testUsers = makeUsersArray();

            beforeEach(`insert users`, () => {
                return db
                    .insert(testUsers)
                    .into('users')
            });

            it(`returns an empty array`, () => {
                const user_id = 1;
                return supertest(app)
                    .get(`/api/favorites/${user_id}`)
                    .expect(200, [])
            });
        });

        context(`Given the user has favorites`, () => {
            const testUsers = makeUsersArray();
            const { recipes } = makeRecipesArray();
            const testFavorites = makeFavoritesArray();

            beforeEach(`insert users, recipes, and favorites into tables`, () => {
                return db
                    .insert(testUsers)
                    .into('users')
                    .then(() => {
                        return db
                            .insert(recipes)
                            .into('recipes')
                            .then(() => {
                                return db
                                    .insert(testFavorites)
                                    .into('favorite_recipes')
                            })
                    })
            });

            it(`returns an array of favorite recipes`, () => {
                const user_id = 1;
                return supertest(app)
                    .get(`/api/favorites/${user_id}`)
                    .expect(200, testFavorites)
            });
        });
    });

    describe(`POST /favorites/:user_id`, () => {
        const testUsers = makeUsersArray();
        const { recipes } = makeRecipesArray();

        beforeEach(`insert users and recipes into tables`, () => {
            return db
                .insert(testUsers)
                .into('users')
                .then(() => {
                    return db
                        .insert(recipes)
                        .into('recipes')
                })
        });

        it(`creates a new favorite record for the specified user for that recipe_id`, () => {
            const user_id = 1;
            const newFavorite = {
                "recipe_id": 1,
                "user_id": 1
            };
            const expectedFavorite = {
                "id": 1,
                "recipe_id": 1,
                "user_id": 1
            }
            return supertest(app)
                .post(`/api/favorites/${user_id}`)
                .send(newFavorite)
                .expect(201, expectedFavorite)
        });
    });

    describe(`DELETE /api/favorites/:user_id/:favorite_id`, () => {
        const testUsers = makeUsersArray();
        const { recipes } = makeRecipesArray();
        const testFavorites = makeFavoritesArray();

        beforeEach(`insert users, recipes, and favorites into tables`, () => {
            return db
                .insert(testUsers)
                .into('users')
                .then(() => {
                    return db
                        .insert(recipes)
                        .into('recipes')
                        .then(() => {
                            return db
                                .insert(testFavorites)
                                .into('favorite_recipes')
                        })
                })
        });

        it(`Deletes the specified comment for the user_id matching the recipe_id`, () => {
            const user_id = 1;
            const favorite_id = 2;

            return supertest(app)
                .delete(`/api/favorites/${user_id}/${favorite_id}`)
                .expect(204)

        });
    });
});