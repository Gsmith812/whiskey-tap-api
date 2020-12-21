const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');
const { makeUsersArray } = require('./users.fixtures');
const { makeRecipesArray } = require('./recipes.fixtures');
const { makeCommentsArray } = require('./comments.fixtures');

describe(`Comments Endpoints`, () => {
    let db;

    before(`make knex instance`, () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db);
    });

    after(`disconnect from db`, () => db.destroy());

    before(`clean the tables`, () => db.raw(`TRUNCATE users, recipes, recipe_comments RESTART IDENTITY CASCADE`));

    afterEach(`cleanup`, () => db.raw(`TRUNCATE users, recipes, recipe_comments RESTART IDENTITY CASCADE`));

    describe(`GET /api/comments/:recipeId`, () => {
        context(`Given no comments`, () => {
            it(`responds with 200 and an empty array`, () => {
                const recipeId = 1;
                return supertest(app)
                    .get(`/api/comments/${recipeId}`)
                    .expect(200, [])
            });
        });

        context(`Given there are comments in the database`, () => {
            const testUsers = makeUsersArray();
            const { recipes } = makeRecipesArray();
            const { testComments, expectedComments } = makeCommentsArray();

            beforeEach(`insert users/recipes/comments`, () => {
                return db
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('recipes')
                            .insert(recipes)
                            .then(() => {
                                return db
                                    .into('recipe_comments')
                                    .insert(testComments)
                            })
                    })
            });

            it(`GET /api/comments/:recipeId`, () => {
                const recipeId = 2;
                return supertest(app)
                    .get(`/api/comments/${recipeId}`)
                    .expect(200, expectedComments)
            });
        });
    });

    describe(`POST /api/comments/:recipeId`, () => {
        const testUsers = makeUsersArray();
        const { recipes } = makeRecipesArray();

        beforeEach(`insert users/recipes`, () => {
            return db
                .into('users')
                .insert(testUsers)
                .then(() => {
                    return db
                        .into('recipes')
                        .insert(recipes)
                })
        });

        it(`creates a new comment attached to recipeId`, () => {
            const { newComment } = makeCommentsArray();
            const recipeId = 2;
            return supertest(app)
                .post(`/api/comments/${recipeId}`)
                .send(newComment)
                .expect(201, newComment)
        });
    });

    describe(`DELETE /api/comments/:recipeId/:commentId`, () => {
        context(`Given no recipe comments`, () => {
            it(`responds with 404`, () => {
                const recipeId = 2;
                const commentId = 1234;
                return supertest(app)
                    .delete(`/api/comments/${recipeId}/${commentId}`)
                    .expect(404, { error: { message: `Comment doesn't exist` }})
            });
        });

        context(`Given recipes and comments exist in the db`, () => {
            const testUsers = makeUsersArray();
            const { recipes } = makeRecipesArray();
            const { testComments, expectedComments } = makeCommentsArray();

            beforeEach(`insert users/recipes/comments`, () => {
                return db
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('recipes')
                            .insert(recipes)
                            .then(() => {
                                return db
                                    .into('recipe_comments')
                                    .insert(testComments)
                            })
                    })
            });

            it(`responds with 204 and removes the comment`, () => {
                const recipeId = 2;
                const commentIdToRemove = 3;
                
                return supertest(app)
                    .delete(`/api/comments/${recipeId}/${commentIdToRemove}`)
                    .expect(204)
                    .then(res => 
                        supertest(app)
                            .get(`/api/comments/${recipeId}`)
                            .expect(expectedComments.filter(comment => comment.id !== commentIdToRemove))
                    )
            });
        });
    });

    describe(`PATCH /api/comments/:recipeId/:commentId`, () => {
        context(`Given no recipe comments`, () => {
            it(`responds with 404`, () => {
                const recipeId = 2;
                const commentId = 1234;
                return supertest(app)
                    .patch(`/api/comments/${recipeId}/${commentId}`)
                    .expect(404, {error: { message: `Comment doesn't exist` }})
            });
        });

        context(`Given there are recipe comments for specified recipe`, () => {
            const testUsers = makeUsersArray();
            const { recipes } = makeRecipesArray();
            const { testComments, expectedComments } = makeCommentsArray();

            beforeEach(`insert users/recipes/comments`, () => {
                return db
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('recipes')
                            .insert(recipes)
                            .then(() => {
                                return db
                                    .into('recipe_comments')
                                    .insert(testComments)
                            })
                    })
            });

            it(`responds with 204 and updates the comment`, () => {
                const idToUpdate = 5;
                const recipeId = 2;
                const updateComment = {
                    content: 'New Content'
                }
                return supertest(app)
                    .patch(`/api/comments/${recipeId}/${idToUpdate}`)
                    .send(updateComment)
                    .expect(204)
            })
        })
    });
});