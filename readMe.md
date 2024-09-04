Voici le README mis à jour en fonction des dernières informations :

# Zephyr

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=Capacitor&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

Zephyr is a modern RSS Feed Reader Android app that allows users to stay updated with their favorite content sources in one place.

## Features

- Aggregate multiple RSS feeds
- User-friendly interface for easy navigation
- Search functionality across all feeds

## Technologies

- Frontend: Angular 16, Ionic 7, Capacitor
- Backend: Express.js, MongoDB

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

## Development Branches

- `front`: Contains the latest version of the frontend without XML parsing
- `back`: Development branch for the backend (Express.js and MongoDB)
- `main`: Stable versions integrating both frontend and backend

## Todo

### Frontend
- [x] Implement basic MVVM structure
- [x] Create Feed model
- [x] Implement FeedService
- [x] Create FeedListViewModel
- [x] Set up two-way binding for search
- [x] Create main UI components (feed list, search bar, article detail)
- [ ] Implement lazy loading for main pages
- [ ] Update UI to display feed items from API
- [ ] Implement error handling and loading indicators
- [ ] Add manual refresh functionality
- [ ] Implement feed item sorting

### Backend
- [ ] Set up Express.js and MongoDB environment
- [ ] Create data models for feeds and articles
- [ ] Implement basic API routes
- [ ] Develop logic for fetching and storing articles
- [ ] Implement XML parsing on the server side
- [ ] Create RESTful API for managing RSS feeds (CRUD operations)
- [ ] Implement periodic article fetching
- [ ] Provide endpoints for retrieving articles

### Integration
- [ ] Update frontend services to consume backend API
- [ ] Implement authentication and user management
- [ ] Sync user preferences between frontend and backend

### Optimization and Performance
- [ ] Implement feed caching
- [ ] Optimize image loading (lazy loading)

### Testing
- [ ] Clean up .spec files
- [ ] Write unit tests for FeedService
- [ ] Write unit tests for FeedListViewModel
- [ ] Write unit tests for backend services
- [ ] Implement basic e2e tests for feed list

### Documentation
- [ ] Update service and component documentation
- [ ] Document XML parsing process and feed management
- [ ] Create API documentation

## Testing

Run the following command to execute the unit tests:

```
ng test
```

## Contact

Célia - [cetrl@proton.me](mailto:cetrl@proton.me)

Project Link: [https://github.com/cetrl/Zephyr](https://github.com/cetrl/Zephyr)

## Acknowledgements

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Capacitor](https://capacitorjs.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Resources

- [Ionic Framework Components](https://ionicframework.com/docs/components)
- [RSS 2.0 Specification](https://www.rssboard.org/rss-specification)
- [Atom Syndication Format](https://tools.ietf.org/html/rfc4287)
- [Express.js Documentation](https://expressjs.com/en/4x/api.html)
- [MongoDB Documentation](https://docs.mongodb.com/)
