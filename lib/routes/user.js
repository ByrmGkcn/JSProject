'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().min(8).example('password123').description('User password (at least 8 characters)'),
                    mail: Joi.string().email().example('john.doe@example.com').description('User email address'),
                    username: Joi.string().min(3).example('johndoe').description('Username of the user'),
                    scope: Joi.string().example('user').description('User scope').default('user')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().example(1).description('Id of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            try {
                return await userService.findById(request.params.id);
            } catch (error) {
                if (error.statusCode === 404) {
                    return h.response('User not found').code(404);
                }

                throw error;
            }
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().example(1).description('Id of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            try {
                await userService.deleteUserById(request.params.id);
                return 'User deleted';
            } catch (error) {
                if (error.statusCode === 404) {
                    return h.response('User not found').code(404);
                }

                throw error;
            }
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().example(1).description('Id of the user')
                }),
                payload: Joi.object({
                    firstName: Joi.string().description('Firstname of the user'),
                    lastName: Joi.string().description('Lastname of the user'),
                    password: Joi.string().description('User password (at least 8 characters)'),
                    username: Joi.string().description('Username of the user'),
                    scope: Joi.string().description('User scope')
                })
            },
            handler: async (request, h) => {
                const { userService } = request.services();
                try {
                    await userService.updateUserById(request.params.id, request.payload);
                    return 'User updated';
                } catch (error) {
                    if (error.statusCode === 404) {
                        return h.response('User not found').code(404);
                    }

                    throw error;
                }
            }
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required().example('example@example.fr').description('User email address'),
                    password: Joi.string().required().example('password123').description('User password (at least 8 characters)')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.validatePassword(request.payload.email, request.payload.password);
        }
    }
];
