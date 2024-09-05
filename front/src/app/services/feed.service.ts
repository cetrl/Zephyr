import { Injectable, signal } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Feed } from '../models/feed.model';
// import { Article } from '../models/article.model';
// import { MOCK_FEEDS, MOCK_ARTICLES } from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private url = 'http://localhost:5200';
  feeds$ = signal<Feed[]>([]);
  feed$ = signal<Feed>({} as Feed);

  constructor(private httpClient: HttpClient) {
  }
  private refreshFeeds() {
    this.httpClient.get<Feed[]>(`${this.url}/feeds`)
      .subscribe(feeds => {
        this.feeds$.set(feeds);
      });
  }

  getFeeds() {
    this.refreshFeeds();
    return this.feeds$();
  }

  getFeed(id: string) {
    this.httpClient.get<Feed>(`${this.url}/feeds/${id}`).subscribe(feed => {
      this.feed$.set(feed);
      return this.feed$();
    });
  }

  addFeed(feed: Feed) {
    return this.httpClient.post(`${this.url}/feeds`, feed, { responseType: 'text' });
  }

  updateFeed(id: string, feed: Feed) {
    return this.httpClient.put(`${this.url}/feeds/${id}`, feed, { responseType: 'text' });
  }

  deleteFeed(id: string) {
    return this.httpClient.delete(`${this.url}/feeds/${id}`, { responseType: 'text' });
  }


  // private feedsSubject = new BehaviorSubject<Feed[]>(MOCK_FEEDS);

  // constructor() {
  //   // initialized with mock-data
  // }

  // getFeeds(): Observable<Feed[]> {
  //   return this.feedsSubject.asObservable();
  // }

  // addFeed(feed: Feed) {
  //   const currentFeeds = this.feedsSubject.value;
  //   const newFeed = { ...feed, id: Date.now().toString() };
  //   this.feedsSubject.next([...currentFeeds, feed]);
  // }
}
