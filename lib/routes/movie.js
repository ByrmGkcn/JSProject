'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/movie',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().min(3).example('Fight Club').description('Title of the movie'),
                    description: Joi.string().required().min(3).example('An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.').description('Description of the movie'),
                    releaseDate: Joi.date().required().example('1999-11-10').description('Release date of the movie'),
                    director: Joi.string().required().min(3).example('David Fincher').description('Director of the movie')
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            return await movieService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().example(1).description('Id of the movie')
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            try {
                return await movieService.findById(request.params.id);
            } catch (error) {
                if (error.statusCode === 404) {
                    return h.response('Movie not found').code(404);
                }

                throw error;
            }
        }
    },
    {
        method: 'delete',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().example(1).description('Id of the movie')
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            try {
                await movieService.deleteMovieById(request.params.id);
                return 'Movie deleted';
            } catch (error) {
                if (error.statusCode === 404) {
                    return h.response('Movie not found').code(404);
                }

                throw error;
            }
        }
    },
    {
        method: 'patch',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().example(1).description('Id of the movie')
                }),
                payload: Joi.object({
                    title: Joi.string().description('Title of the movie'),
                    description: Joi.string().description('Description of the movie'),
                    releaseDate: Joi.date().description('Release date of the movie'),
                    director: Joi.string().description('Director of the movie')
                })
            },
            handler: async (request, h) => {
                const { movieService } = request.services();
                try {
                    await movieService.updateMovieById(request.params.id, request.payload);
                    return 'Movie updated';
                } catch (error) {
                    if (error.statusCode === 404) {
                        return h.response('Movie not found').code(404);
                    }

                    throw error;
                }
            }
        }
    }
];