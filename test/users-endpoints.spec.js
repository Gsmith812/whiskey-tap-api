const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');
const { makeUsersArray, makeNewUser } = require('./users.fixtures');

describe(`Users Endpoints`, () => {
    let db;

    before(`make knex instance`, () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db);
    });

    after(`disconnect from db`, () => db.destroy());

    before(`clean the table`, () => db.raw(`TRUNCATE users RESTART IDENTITY CASCADE`));

    afterEach(`cleanup`, () => db.raw(`TRUNCATE users RESTART IDENTITY CASCADE`));

    describe(`POST /api/users/create`, () => {
        it(`creates new user and sends back user id and first_name`, () => {
            const { newUser } = makeNewUser();

            return supertest(app)
                .post(`/api/users/create`)
                .send(newUser)
                .expect(201)
                .expect(res => {
                    expect(res.body.id).to.eql(1)
                    expect(res.body.first_name).to.eql(newUser.first_name)
                })
        });
    });

    describe(`POST /api/users/login`, () => {
        const { newUser } = makeNewUser();
        
        beforeEach(`create initial user`, () => {
            return supertest(app)
                .post(`/api/users/create`)
                .send(newUser)
        });

        it(`it logs the user in and sends back their user id and first name`, () => {
            const loginCredentials = {
                email: 'johndoe@yahoo.com',
                password: '12345678',
            };
            const expectedUserId = 1;

            return supertest(app)
                .post(`/api/users/login`)
                .send(loginCredentials)
                .expect(200)
                .expect(res => {
                    expect(res.body.id).to.eql(expectedUserId)
                    expect(res.body.userName).to.eql(newUser.first_name)
                })
        })
    });
});