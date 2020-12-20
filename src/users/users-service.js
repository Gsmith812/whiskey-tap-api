const bcrypt = require('bcryptjs');

const UsersService = {
    insertNewUser(knex, user) {
        return knex
            .insert(user)
            .into('users')
            .returning('*')
            .then(rows => rows[0]);
    },
    findByEmail(knex, email) {
        return knex('users')
            .where({ email })
            .first('*');
    },
    hashPassword(password) {
        return bcrypt.hash(password, 10);
    },
    comparePasswords(loginPassword, savedPassword) {
        return bcrypt.compare(loginPassword, savedPassword);
    }
}

module.exports = UsersService;