# Zephyrss Backend

This is the backend for the Zephyrss RSS reader application, built with Node.js, Express, and MongoDB.

## Features

- MongoDB integration with schema validation
- RESTful API for feeds, articles, and users
- XML parsing for RSS feeds
- Authentication system (in progress)

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4.4 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/cetrl/Zephyr.git
   ```
2. Navigate to the project directory:
   ```
   cd Zephyr
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your MongoDB URI:
MONGO_URI=mongodb://localhost:27017/zephyr

5. Start the back server:
   ```
   npx ts-node src/server.ts
   ```

6. Run the development server:
   ```
   ionic serve
   ```
   
## API Endpoints

- `GET /api/feeds`: Get all feeds
- `POST /api/feeds`: Create a new feed
- `GET /api/articles`: Get all articles
- `GET /api/articles/:id`: Get a specific article
- `POST /api/users`: Create a new user
- `GET /api/users/:id`: Get a specific user

## Sprint 1 (2,5 j)
(0,5j)
- [x] Improve route organization 
- [x] Standardize API responses (réécrire routes)

(1j)
- [ ] déploiement back

(1j)
- [ ] branchement de l'api au front

## Sprint 2 (3 j)
(0,5j)
- [ ] Formulaire sign in/sign up

(1j)
- [ ] Mettre en place l'authentification
- [ ] routes pour l'inscription et la connexion

(1j)
- [ ] déploiement mobile

(0,5j)
- [ ] Mettre à jour le README avec les instructions d'installation et d'utilisation
- [ ] Démo

## Nice to Have
- [ ] Formulaire mdp oublié 
- [ ] Start API documentation with Swagger/OpenAPI
- [ ] stocker id articles fav
- [ ] routes pour le mdp oublié (envoi email, token,...)
- [ ] Mettre en cache les résultats fréquemment demandés
### Tests
- [ ] Config environnement de test (ex: Jest)
- [ ] Écrire des tests unitaires pour les services
- [ ] Écrire des tests d'intégration pour les routes API

## Contact

Célia - [cetrl@proton.me](cetrl@proton.me)

Project Link: [https://github.com/cetrl/Zephyr](https://github.com/cetrl/Zephyr)

## Acknowledgements

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Capacitor](https://capacitorjs.com/)

## Resources

- [Ionic Framework Components](https://ionicframework.com/docs/components)
- [RSS 2.0 Specification](https://www.rssboard.org/rss-specification)
- [Atom Syndication Format](https://tools.ietf.org/html/rfc4287)
