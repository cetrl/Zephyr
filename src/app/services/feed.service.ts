import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Feed } from '../models/feed.model';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private feedsSubject = new BehaviorSubject<Feed[]>([]);

  constructor() {
    // initialize with test datas if needed
  }

  getFeeds(): Observable<Feed[]> {
    return this.feedsSubject.asObservable();
  }

  addFeed(feed: Feed) {
    const currentFeeds = this.feedsSubject.value;
    this.feedsSubject.next([...currentFeeds, feed]);
  }

  getArticle(id: string): Observable<Article> {
    // Simulate API call
    return of({
      id,
      title: 'Sample Article',
      content: 'This is a sample article content.',
      publishDate: new Date(),
      publisher: 'sample publisher',
      link: 'https://sample-link-article.com'
    });
  }
}
