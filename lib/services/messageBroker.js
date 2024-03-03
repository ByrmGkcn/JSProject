'use strict';

const { Service } = require('@hapipal/schmervice');

const amqp = require('amqplib');

module.exports = class MessageBrokerService extends Service {
    async sendCsvToQueue(csvData) {
        const queue = 'movie-export'; // Nom de la file d'attente RabbitMQ

        try {
            // Connexion à RabbitMQ
            const connection = await amqp.connect('amqp://localhost');
            const channel = await connection.createChannel();

            // Déclarer la file d'attente
            await channel.assertQueue(queue, { durable: false });

            // Envoyer les données CSV à la file d'attente
            channel.sendToQueue(queue, Buffer.from(csvData));

            // Fermer la connexion
            await channel.close();
            await connection.close();
        } catch (error) {
            console.error('Error sending CSV to queue:', error);
        }
    }
};