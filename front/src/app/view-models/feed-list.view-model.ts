import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Feed } from '../models/feed.model';
import { FeedService } from '../services/feed.service';

@Injectable()
export class FeedListViewModel {
  private allFeeds$: Observable<Feed[]>;
  private searchTermSubject = new BehaviorSubject<string>('');

  feeds$: Observable<Feed[]>;
  searchTerm: string = '';

  constructor(private feedService: FeedService) {
    this.allFeeds$ = this.feedService.getFeeds();

    this.feeds$ = combineLatest([
      this.allFeeds$,
      this.searchTermSubject.asObservable()
    ]).pipe(
      map(([feeds, term]) =>
        feeds.filter(feed =>
          feed.title.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  updateSearchTerm(term: string) {
    this.searchTerm = term;
    this.searchTermSubject.next(term);
  }

  addFeed(title: string, url: string) {
    const newFeed: Feed = {
      id: Date.now().toString(), // Simple unique ID generation
      title,
      url
    };
    this.feedService.addFeed(newFeed);
  }
}
