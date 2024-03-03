
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
};

