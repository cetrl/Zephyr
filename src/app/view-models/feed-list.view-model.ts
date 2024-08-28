import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Feed } from '../models/feed.model';
import { FeedService } from '../services/feed.service';

@Injectable()
export class FeedListViewModel {
  //observable for all feeds
  private allFeeds$: Observable<Feed[]>;
  //subject to manage search term changes
  private searchTermSubject = new BehaviorSubject<string>('');

  // public observable for filtered feeds
  feeds$: Observable<Feed[]>;
  //public porperty for current search term
  searchTerm: string = '';

  constructor(private feedService: FeedService) {
    //get all feeds from service
    this.allFeeds$ = this.feedService.getFeeds();

    //combine feeds and search term observable
    this.feeds$ = combineLatest([
      this.allFeeds$,
      this.searchTermSubject.asObservable()
    ]).pipe(
      //filter feeds based on search term
      map(([feeds, term]) =>
        feeds.filter(feed =>
          feed.title.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }
// update search term and notify observers
  updateSearchTerm(term: string) {
    this.searchTerm = term;
    this.searchTermSubject.next(term);
  }
}
