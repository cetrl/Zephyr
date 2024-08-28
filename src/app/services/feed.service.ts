import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Feed } from '../models/feed.model';

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
}
