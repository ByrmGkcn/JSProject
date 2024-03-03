'use strict';

module.exports = {
    method: 'get',
    path: '/favorites',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api'],
        handler: async (request, h) => {
            const { favoriteService } = request.services();

            return await favoriteService.getAll(request);
        }
    }
};