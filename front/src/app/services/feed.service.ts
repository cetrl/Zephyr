import { Injectable, signal } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Feed } from '../models/feed.model';
import { Article } from '../models/article.model';
import { MOCK_ARTICLES } from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private url = 'http://localhost:5200/api';
  feeds$ = signal<Feed[]>([]);
  feed$ = signal<Feed>({} as Feed);
  private articles: Article[] = MOCK_ARTICLES;


  constructor(private httpClient: HttpClient) {
  }

  getFeeds(): Observable<Feed[]> {
    return this.httpClient.get<Feed[]>(`${this.url}/feeds`);
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

  getRecentArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  getArticle(feedId: string, articleIndex: number): Observable<Article | undefined> {
    return this.httpClient.get<Article>(`${this.url}/articles/${feedId}/${articleIndex}`).pipe(
      catchError(error => {
        console.error('error', error);
        return of(undefined);
      })
    );
  }
}
