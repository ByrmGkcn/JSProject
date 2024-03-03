'use strict';

const Joi = require('joi');

module.exports = [
    {
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
    },
    {
        method: 'GET',
        path: '/movies/export',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            description: 'Export CSV of all movies'
        },
        handler: async (request, h) => {
            const { movieService } = request.services();

            // Générer le CSV des films
            const csvData = await movieService.generateCsv();

            // Envoyer les données CSV à la file d'attente RabbitMQ
            const messageBrokerService = request.server.services().messageBrokerService;
            await messageBrokerService.sendCsvToQueue(csvData);

            return h.response().code(204); // Pas de contenu dans la réponse HTTP
        }
    }
];
