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
            next({
                status: 400,
                message: `Something went wrong. Please try again later.`
            })
        }

    });

usersRouter
    .route('/login')
    .post(jsonParser, async (req, res, next) => {
        const { email, password } = req.body;
        const userInfo = { email: email.toLowerCase(), password };
        for(const [key, value] of Object.entries(userInfo)) {
            if(!value) {
                res.status(400).json({
                    error: {message: `Missing '${key}' in request body`}
                })
            }
        }
        try {
            const matchedUser = await UsersService.findByEmail(
                req.app.get('db'),
                email
            )
            if(!matchedUser) {
                return res.status(401).json({
                    error: { message: `Username/Password did not match`}
                })
            }
            const passMatch = await UsersService.comparePasswords(password, matchedUser.password);

            if(!passMatch) {
                return res.status(401).json({
                    error: { message: `Username/Password did not match` }
                })
            }
            console.log(matchedUser)
            res.json({
                id: matchedUser.id,
                userName: matchedUser.first_name
            })
        } catch(err) {
           
            next({status: 401, message: `Something went wrong. Try again later.`});
        }
    })

module.exports = usersRouter;