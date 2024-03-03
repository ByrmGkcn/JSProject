'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('../modules/iut-encrypt');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const MailService = require('./emailService.js');

require('dotenv').config();

module.exports = class UserService extends Service {

    async create(user) {
        const { User } = this.server.models();

        user.password = Encrypt.sha1(user.password);

        const newUser = await User.query().insertAndFetch(user);

        const mailService = new MailService();

        await mailService.sendWelcomeEmail(newUser.mail);

        return newUser;
    }


    async find() {

        const { User } = this.server.models();

        return await User.query().select('id', 'firstName', 'lastName', 'mail', 'username', 'password', 'scope');
    }

    async deleteUserById(id) {
        const { User } = this.server.models();

        // Utilisez la méthode delete() pour supprimer l'utilisateur par son identifiant
        const deletedRowCount = await User.query().deleteById(id);

        if (deletedRowCount === 0) {
            // Si aucun utilisateur n'est supprimé, lancez une erreur
            const error = new Error('Utilisateur non trouvé');
            error.statusCode = 404;
            throw error;
        }
    }

    async updateUserById(id, user) {
        const { User } = this.server.models();


        if (user.password) {
            user.password = Encrypt.sha1(user.password);
        }

        const updatedUser = await User.query().updateAndFetchById(id, user);

        if (updatedUser === 0) {
            const error = new Error('Utilisateur non trouvé');
            error.statusCode = 404;
            throw error;
        }
    }

    async validatePassword(email, password) {
        const { User } = this.server.models();

        const user = await User.query().findOne({
            mail: email,
            password: Encrypt.sha1(password)
        });

        if (user) {
            const jwtPayload = {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                email: user.mail,
                scope: user.scope
            };

            const jwtOptions = {
                key: 'your_random_string', // La clé qui est définie dans lib/auth/strategies/jwt.js
                algorithm: 'HS512',
                ttlSec: 14400 // 4 heures
            };

            const token = Jwt.token.generate(jwtPayload, jwtOptions);

            return { login: 'successful', token };
        }

        throw Boom.unauthorized('Invalid password');
    }

    async findById(id) {
        const { User } = this.server.models();

        const user = await User.query().findById(id);

        if (!user) {
            const error = new Error('Utilisateur non trouvé');
            error.statusCode = 404;
            throw error;
        }

        return user;
    }
};
