import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feed } from '../models/feed.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  getFeeds(): Observable<Feed[]> {
    // Simuler un appel API
    return of([
      { id: '1', title: 'Feed 1', url: 'http://example.com/feed1' },
      { id: '2', title: 'Feed 2', url: 'http://example.com/feed2' }
    ]);
  }
}
