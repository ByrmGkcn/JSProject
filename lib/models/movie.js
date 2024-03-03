'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {

        return 'movie';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(2).example('Fight Club').description('Title of the movie'),
            description: Joi.string().min(2).example('An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.').description('Description of the movie'),
            releaseDate: Joi.date().example('1999-11-10').description('Release date of the movie'),
            director: Joi.string().min(2).example('David Fincher').description('Director of the movie'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};
