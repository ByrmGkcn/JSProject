
// eslint-disable-next-line strict
const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

require('dotenv').config();

module.exports = class EmailService extends Service {
    constructor() {
        super();
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }, tls: {
                ciphers: 'SSLv3'
            }
        });
    }

    async sendWelcomeEmail(userEmail) {
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: userEmail,
            subject: 'Bienvenue sur notre plateforme',
            text: 'Bienvenue sur notre plateforme. Merci de vous être inscrit!'
        };

        await this.transporter.sendMail(mailOptions);
    }

    async sendNewMovieEmail(mail, movie) {
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: mail,
            subject: 'Nouveau film ajouté',
            text: `Un nouveau film a été ajouté: ${movie.title}`
        };

        await this.transporter.sendMail(mailOptions);
    }

    async sendModifiedMovieEmail(mail, movie) {
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: mail,
            subject: 'Film modifié',
            text: `Le film ${movie.title} a été modifié`
        };

        await this.transporter.sendMail(mailOptions);
    }

    async sendCSVByEmail(filePath,mail) {
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: mail,
            subject: 'Export CSV des films',
            text: 'Voici le fichier CSV des films en pièce jointe.',
            attachments: [
                {
                    filename: 'movies.csv',
                    path: filePath
                }
            ]
        };

        return transporter.sendMail(mailOptions);
    }
};

