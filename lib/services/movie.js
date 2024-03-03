'use strict';

const { Service } = require('@hapipal/schmervice');
const EmailService = require('./emailService.js');
const Fs = require('fs');
const Csv = require('fast-csv');

module.exports = class MovieService extends Service {

    async create(movie) {

        const { Movie, User } = this.server.models();
        const newMovie = await Movie.query().insertAndFetch(movie);

        //quand un nouveau film est ajouté, on envoie un mail à tous les utilisateurs
        const users = await User.query();

        const emailservice = new EmailService();

        users.forEach((user) => {
            emailservice.sendNewMovieEmail(user.mail, newMovie);
        });

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

        //tous les utilisateurs qui ont le film en favoris recoivent un mail
        const { Favorite, User } = this.server.models();
        const users = await User.query();
        const movieId = id;
        const emailservice = new EmailService();

        for (const user of users) {
            const favorite = await Favorite.query().where({
                user_id: user.id,
                movie_id: movieId
            });
            if (favorite.length > 0) {
                await emailservice.sendModifiedMovieEmail(user.mail, updatedMovie);
            }
        }

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

    async generateCsv() {
        const { Movie } = this.server.models();

        const movies = await Movie.query();

        const csvHeaders = ['Title', 'Description', 'Release Date', 'Director'];

        const csvStream = Csv.format({ headers: true });

        const writableStream = Fs.createWriteStream('movies.csv');
        csvStream.pipe(writableStream);

        movies.forEach((movie) => {
            csvStream.write({
                'Title': movie.title,
                'Description': movie.description,
                'Release Date': movie.releaseDate,
                'Director': movie.director
            });
        });

        // Finaliser l'écriture du fichier CSV
        csvStream.end();

        return 'movies.csv'; // Renvoyer le nom du fichier CSV généré
    }
};