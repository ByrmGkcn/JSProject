'use strict';

const Amqp = require('amqplib');
const MailService = require('../lib/services/emailService');

const receiveCsvFromQueue = async () => {
    const queue = 'movie-export';

    try {

        const connection = await Amqp.connect('amqp://localhost');

        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: false });

        channel.consume(queue, (msg) => {
            const csvData = msg.content.toString();

            sendCsvByEmail(csvData);
        }, { noAck: true });
    } catch (error) {
        console.error('Error:', error);
    }
};



const  sendCsvByEmail = (csvData) => {
    const mailService = new MailService();
    mailService.sendEmailWithAttachment('noreply@noreply.com', 'Movies CSV', 'Please find attached the movies CSV file.', csvData);
};

module.exports = { receiveCsvFromQueue };