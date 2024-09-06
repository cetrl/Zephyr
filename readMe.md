# Zephyr Backend

This is the backend for the Zephyr RSS reader application, built with Node.js, Express, and MongoDB.

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
npm start

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

## Todo Backend

### Configuration de base
- [x] Initialiser le projet Node.js
- [x] Configurer Express.js
- [x] Mettre en place la structure de base du projet

### Base de données
- [x] Configurer la connexion MongoDB
- [x] Créer les schémas pour Feed et Article

### Parsing RSS
- [ ] Intégrer une bibliothèque de parsing RSS (ex: rss-parser)
- [ ] Créer un service pour récupérer et parser les flux RSS
- [ ] Implémenter la logique de mise à jour périodique des feeds

### Authentification
- [ ] Mettre en place l'authentification
- [ ] routes pour l'inscription et la connexion
- [ ] Sécuriser routes appropriées

### Gestion des erreurs
- [ ] middleware de gestion globale des erreurs
- [ ] logs détaillés

### Tests
- [ ] Config environnement de test (ex: Jest)
- [ ] Écrire des tests unitaires pour les services
- [ ] Écrire des tests d'intégration pour les routes API

### Optimisation
- [ ] Implémenter la pagination pour les listes de feeds et d'articles
- [ ] Mettre en cache les résultats fréquemment demandés

### Documentation
- [ ] Mettre à jour le README avec les instructions d'installation et d'utilisation

## Testing

Run the following command to execute the unit tests:

```
ng test
```

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
