import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { FeedService } from '../services/feed.service';

@Injectable()
export class ArticleDetailViewModel {
  article$: Observable<Article | undefined> = new Observable<Article | undefined>();

  constructor(private feedService: FeedService) {}

  loadArticle(id: string) {
    this.article$ = this.feedService.getArticle(id).pipe(
      map(article => {
        if (!article) {
          throw new Error('Article not found');
        }
        return article;
      }),
      catchError(error => {
        console.error('Error loading article:', error);
        return of(undefined);
      })
    );
  }
}
