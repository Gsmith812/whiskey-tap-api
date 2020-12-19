const express = require('express');
const xss = require('xss');
const UsersService = require('./users-service');

usersRouter = express.Router();
jsonParser = express.json();

usersRouter
    .route('/create')
    .post(jsonParser, async (req, res, next) => {
        const { first_name, last_name, date_of_birth, email, password } = req.body;
        const newUser = { first_name, last_name, email: email.toLowerCase(), password, date_of_birth };
        for(const [key, value] of Object.entries(newUser)) {
            if(!value) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body`}
                })
            }
        }

        try {
            const emailInUse = await UsersService.findByEmail(
                req.app.get('db'),
                newUser.email
            );
            if(emailInUse) {
                return res.status(400).json({
                    error: { message: `Email is already in use` }
                })
            }

            newUser.password = await UsersService.hashPassword(newUser.password);

            const savedUser = await UsersService.insertNewUser(
                req.app.get('db'),
                newUser
            );
            delete savedUser.password;

            res
                .status(201)
                .location(`/users/${savedUser.id}`)
                .json(savedUser);
        } catch(err) {
            res.status(400).json({
                error: { message: err.message }
            })
        }

    });

module.exports = usersRouter;