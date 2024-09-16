import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Feed } from '../models/feed.model';
import { FeedService } from '../services/feed.service';

@Injectable({
  providedIn: 'root',
})
export class FeedListViewModel {
  private searchTermSubject = new BehaviorSubject<string>('');
  private refreshSubject = new BehaviorSubject<void>(undefined);

  feeds$: Observable<Feed[]>;
  searchTerm = '';

  constructor(private feedService: FeedService) {
    this.feeds$ = this.refreshSubject.pipe(
      switchMap(() => this.feedService.getFeeds()),
      switchMap(feeds =>
        this.searchTermSubject.pipe(
          map(term =>
            feeds.filter(feed =>
              feed.name.toLowerCase().includes(term.toLowerCase())
            )
          )
        )
      )
    );
  }

  updateSearchTerm(term: string): void {
    this.searchTerm = term;
    this.searchTermSubject.next(term);
  }

  addFeed(name: string, url: string): void {
    this.feedService.addFeed({ name, url }).subscribe(
      () => this.refreshFeeds(),
      error => console.error('failed to add feed', error)
    );
  }

  refreshFeeds(): void {
    this.refreshSubject.next();
  }

  updateFeed(id: string, updatedFeed: Feed): void {
    this.feedService.updateFeed(id, updatedFeed).subscribe(
      () => this.refreshFeeds(),
      error => console.error('failed to update feed', error)
    );
  }

  deleteFeed(id: string): void {
    this.feedService.deleteFeed(id).subscribe(
      () => this.refreshFeeds(),
      error => console.error('failed to delete feed', error)
    );
  }
}
