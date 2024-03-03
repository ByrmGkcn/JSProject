'use strict';

const Amqp = require('amqplib');
const MailService = require('../lib/services/mail');

const receiveCsvFromQueue = async () => {
    const queue = 'movie-export';

    try {
        console.log('Attempting to connect to RabbitMQ...');

        const connection = await Amqp.connect('amqp://localhost');
        console.log('Connected to RabbitMQ.');

        const channel = await connection.createChannel();
        console.log('Channel created.');

        console.log(`Asserting queue: ${queue}`);
        await channel.assertQueue(queue, { durable: false });
        console.log(`Queue asserted: ${queue}`);

        // Recevoir les données CSV de la file d'attente
        console.log(' [*] Waiting for CSV data...');
        channel.consume(queue, (msg) => {
            const csvData = msg.content.toString();
            console.log(' [x] Received CSV data:', csvData);

            // Envoyer les données CSV par e-mail
            console.log('Sending CSV data by email...');
            sendCsvByEmail(csvData);
        }, { noAck: true });
    } catch (error) {
        console.error('Error:', error);
    }
};



const  sendCsvByEmail = (csvData) => {
    // Envoyer les données CSV par e-mail en utilisant le service MailService
    const mailService = new MailService();
    console.log('Mail service created.');
    mailService.sendEmailWithAttachment('admin@gmail.com', 'Movies CSV', 'Please find attached the movies CSV file.', csvData).then((r) => console.log(r)).catch((e) => console.error(e));

    console.log(' [x] Sent CSV data by email');
};

module.exports = { receiveCsvFromQueue };