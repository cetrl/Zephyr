import { Injectable, signal } from '@angular/core';
import { Observable, of, catchError, map, switchMap, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Feed } from '../models/feed.model';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private url = 'http://localhost:5200/api';
  feeds$ = signal<Feed[]>([]);
  feed$ = signal<Feed>({} as Feed);

  constructor(private httpClient: HttpClient) {}

  getFeeds(): Observable<Feed[]> {
    return this.httpClient.get<Feed[]>(`${this.url}/feeds`).pipe(
      catchError(error => {
        console.error('you fucked up fetching feeds:', error);
        return of([]);
      })
    );
  }

  getFeed(id: string): Observable<Feed> {
    return this.httpClient.get<Feed>(`${this.url}/feeds/${id}`).pipe(
      catchError(error => {
        console.error(`you couldn't even fetch one feed, id: ${id}:`, error);
        return of({} as Feed);
      })
    );
  }

  addFeed(feed: Feed): Observable<string> {
    return this.httpClient.post(`${this.url}/feeds`, feed, { responseType: 'text' });
  }

  updateFeed(id: string, feed: Feed): Observable<string> {
    return this.httpClient.put(`${this.url}/feeds/${id}`, feed, { responseType: 'text' });
  }

  deleteFeed(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/feeds/${id}`, { responseType: 'text' });
  }

  getRecentArticles(): Observable<Article[]> {
    return this.getFeeds().pipe(
      switchMap(feeds => {
        const articleRequests = feeds
          .filter(feed => feed._id !== undefined)  // Filter out feeds without an _id
          .map(feed => this.getArticle(feed._id as string, 1));  // Assert _id as string
        return forkJoin(articleRequests);
      }),
      map(articles => articles.filter((article): article is Article => article !== undefined)),
      catchError(error => {
        console.error('cannot get recentarticle:', error);
        return of([]);
      })
    );
  }

  getArticle(feedId: string, articleIndex: number): Observable<Article | undefined> {
    return this.httpClient.get<Article>(`${this.url}/articles/${feedId}/${articleIndex}`).pipe(
      catchError(error => {
        console.error(`error getting article for feed ${feedId}, index ${articleIndex}:`, error);
        return of(undefined);
      })
    );
  }
}
