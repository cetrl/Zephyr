import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from '../models/feed.model';
import { FeedService } from '../services/feed.service';

@Injectable()
export class FeedListViewModel {
  feeds$: Observable<Feed[]>;

  constructor(private feedService: FeedService) {
    this.feeds$ = this.feedService.getFeeds();
  }
}
