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


## Todo

### Architecture MVVM
- [x] Implémenter la structure de base MVVM
- [x] Créer le modèle Feed
- [x] Implémenter FeedService
- [x] Créer FeedListViewModel
- [x] Mettre en place le binding bidirectionnel pour la recherche

### Composants UI principaux
- [x] Créer la liste des flux
- [x] Implémenter la barre de recherche
- [x] Ajouter la fonctionnalité d'ajout de flux
- [x] Créer le composant de détail d'un article
- [x] Composant latest articles

### Navigation
- [x] Configurer le routing de base
- [ ] Implémenter le lazy loading pour les pages principales

### Lecture de flux RSS
- [ ] Installer et configurer xml2js
- [ ] Créer XmlParserService
- [ ] Implémenter la détection et le parsing des différents formats (RSS 2.0, Atom, RSS 1.0)
- [ ] Mettre à jour FeedService pour intégrer le parsing XML
- [ ] Créer une interface FeedItem pour normaliser les données des flux
- [ ] Mettre à jour l'UI pour afficher les éléments du flux
- [ ] Implémenter la gestion des erreurs et les indicateurs de chargement
- [ ] Ajouter une fonctionnalité de rafraîchissement manuel
- [ ] Implémenter le tri des éléments du flux

### Optimisation et Performance
- [ ] Mettre en place la mise en cache des flux
- [ ] Optimiser le chargement des images (lazy loading)

### Tests
- [ ] Cleaner .spec
- [ ] tests unitaires FeedService
- [ ] tests unitaires FeedListViewModel
- [ ] tests unitaires XmlParserService
- [ ] tests e2e basiques liste des flux

### Documentation
- [ ] Mettre à jour la documentation des services et composants
- [ ] Documenter le processus de parsing XML et de gestion des flux

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
