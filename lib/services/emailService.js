// eslint-disable-next-line strict
const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

async function sendWelcomeEmail(userEmail) {
    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: userEmail,
        subject: 'Bienvenue sur notre plateforme',
        text: 'Bienvenue sur notre plateforme. Merci de vous être inscrit!',
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendWelcomeEmail };
