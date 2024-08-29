import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { FeedService } from '../services/feed.service';

@Injectable()
export class ArticleDetailViewModel {
  article$: Observable<Article> = new Observable();

  constructor(private feedService: FeedService) {}

  loadArticle(id: string) {
    this.article$ = this.feedService.getArticle(id);
  }
}
