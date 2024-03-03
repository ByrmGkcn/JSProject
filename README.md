# JSProject


## Description du projet

Ce projet constitue une application de gestion d'une bibliothèque de films. Il offre aux utilisateurs la possibilité de créer un compte, d'ajouter des films à leurs favoris, et de recevoir des notifications par e-mail lors de l'ajout d'un nouveau film ou de modifications sur leurs films favoris. Les fonctionnalités d'ajout, de modification et de suppression de films sont exclusivement réservées aux administrateurs, qui peuvent également exporter l'ensemble des films de la base de données au format CSV.

## Fonctionnalités spéciales

### Administrateur 
- Création, suppression et modification de films.
- Création, suppression et modification d'utilisateurs.
- Export CSV de l'ensemble des films

### Utilisateur
- Gestion d'une liste de films favoris pour chaque utilisateur (user)

### Automatique
- Envoi d'un e-mail de bienvenue lorsqu'un utilisateur est créé
- Notifications par e-mail lorsqu'un nouveau film est ajouté ou lorsqu'un film favori est modifié

## Technologies utilisées
- Node.js
- Docker
- RabbitMQ
- MySQL

## Démarage de l'application
1. Clonez le dépôt GitHub
2. Installez les dépendances avec `npm install`
3. Démarrez les conteneurs Docker de base de données et RabbitMQ avec les commandes suivantes :
   
`docker run --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d -p 3307:3306 -d mysql:8 mysqld --default-authentication-plugin=mysql_native_password`

`docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:3.13-management`
Démarrez le serveur avec `npm run start`

Accédez au swagger via `http://localhost:3000/documentation`
Accèdez au gesionnaire RabbitMq via `http://localhost:15672`

## Variables d'environnement

`MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_SECURE=true
MAIL_USER=keira.ruecker@ethereal.email
MAIL_PASSWORD=zmwnanZmqTPmBCSfWV
MAIL_FROM=kiera.pagac78@ethereal.email`

## Auteur 

GOKCEN Bayram


