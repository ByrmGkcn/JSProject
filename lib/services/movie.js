'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class MovieService extends Service {

    async create(movie) {

        const { Movie } = this.server.models();

        const newMovie = await Movie.query().insertAndFetch(movie);

        return newMovie;
    }

    async find() {

        const { Movie } = this.server.models();

        return await Movie.query().select('id', 'title', 'description', 'releaseDate', 'director');
    }

    async deleteMovieById(id) {
        const { Movie } = this.server.models();

        const deletedRowCount = await Movie.query().deleteById(id);

        if (deletedRowCount === 0) {
            const error = new Error('Movie not found');
            error.statusCode = 404;
            throw error;
        }
    }

    async updateMovieById(id, movie) {
        const { Movie } = this.server.models();

        const updatedMovie = await Movie.query().updateAndFetchById(id,movie);

        if (updatedMovie === 0) {
            const error = new Error('Movie not found');
            error.statusCode = 404;
            throw error;
        }
    }

    async findById(id) {
        const { Movie } = this.server.models();

        const movie = await Movie.query().findById(id);

        if (!movie) {
            const error = new Error('Movie not found');
            error.statusCode = 404;
            throw error;
        }

        return movie;
    }
};