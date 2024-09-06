# Zephyr

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=Capacitor&logoColor=white)

Zephyr is a modern RSS Feed Reader Android app that allows users to stay updated with their favorite content sources in one place.

## Features

- Aggregate multiple RSS feeds
- User-friendly interface for easy navigation
- Search functionality across all feeds

## Technologies

- Angular 16
- Ionic 7
- Capacitor

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
4. Run the development server:
   ```
   ionic serve
   ```

## Project Structure

```
src/
├── app/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── view-models/
│   └── models/
├── assets/
├── themes/
└── environments/
```


## Todo Backend

### Configuration de base
- [x] Initialiser le projet Node.js
- [x] Configurer Express.js
- [x] Mettre en place la structure de base du projet

### Base de données
- [x] Configurer la connexion MongoDB
- [ ] Créer les schémas pour Feed et Article

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
