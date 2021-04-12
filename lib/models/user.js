'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            password: Joi.string().min(8).example('password123').description('User password (at least 8 characters)'),
            mail: Joi.string().email().example('john.doe@example.com').description('User email address'),
            username: Joi.string().min(3).example('johndoe').description('Username of the user'),
            scope: Joi.string().example('user').description('User scope').default('user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        if (!this.scope) {
            this.scope = 'user';
        }
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};
