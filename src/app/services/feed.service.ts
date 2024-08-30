import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Feed } from '../models/feed.model';
import { Article } from '../models/article.model';
import { MOCK_FEEDS, MOCK_ARTICLES } from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private feedsSubject = new BehaviorSubject<Feed[]>(MOCK_FEEDS);

  constructor() {
    // initialized with mock-data
  }

  getFeeds(): Observable<Feed[]> {
    return this.feedsSubject.asObservable();
  }

  addFeed(feed: Feed) {
    const currentFeeds = this.feedsSubject.value;
    const newFeed = { ...feed, id: Date.now().toString() };
    this.feedsSubject.next([...currentFeeds, feed]);
  }

  getArticle(id: string): Observable<Article | undefined> {
    const article = MOCK_ARTICLES.find(a => a.id === id);
    return of(article);
  }

  getArticlesForFeed(feedId: string): Observable<Article[]> {
    const articles = MOCK_ARTICLES.filter(a => a.id === feedId);
    return of(articles);

  }
}
