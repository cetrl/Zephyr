import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { FeedService } from '../services/feed.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleDetailViewModel {
  article$: Observable<Article | undefined> = new Observable<Article | undefined>();

  constructor(private feedService: FeedService) {}

  loadArticle(feedId: string, articleIndex: number) {
    this.article$ = this.feedService.getArticle(feedId, articleIndex).pipe(
      map(article => {
        if (!article) {
          throw new Error('article not found');
        }
        return article;
      }),
      catchError(error => {
        console.error('error:', error);
        return of(undefined);
      })
    );
  }
}
