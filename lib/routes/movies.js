'use strict';

const Joi = require('joi');

module.exports = {
    method: 'get',
    path: '/movies',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { movieService } = request.services();
        return await movieService.find();
    }
};
