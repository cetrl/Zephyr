import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, forkJoin } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Feed } from '../models/feed.model';
import { Article } from '../models/article.model';
import { XmlParserService } from './xml-parser.service';
import { MOCK_FEEDS, MOCK_ARTICLES } from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private feedsSubject = new BehaviorSubject<Feed[]>(MOCK_FEEDS);
  private articlesCache: Article[] = MOCK_ARTICLES;

  constructor(
    private http: HttpClient,
    private xmlParser: XmlParserService
  ) {}

  getRecentArticles(limit: number = 5): Observable<Article[]> {
    return this.getAllArticles().pipe(
      map(articles => articles.slice(0, limit))
    );
  }

  getFeeds(): Observable<Feed[]> {
    return this.feedsSubject.asObservable();
  }

  addFeed(feed: Feed) {
    const currentFeeds = this.feedsSubject.value;
    this.feedsSubject.next([...currentFeeds, feed]);
    this.refreshArticles();
  }

  getArticle(id: string): Observable<Article | undefined> {
    return this.getAllArticles().pipe(
      map(articles => articles.find(a => a.id === id))
    );
  }

  private getAllArticles(): Observable<Article[]> {
    return this.getFeeds().pipe(
      switchMap(feeds => {
        if (feeds.length === 0) {
          return of(this.articlesCache);
        }
        const articleObservables = feeds.map(feed => this.fetchArticlesForFeed(feed.url));
        return forkJoin(articleObservables).pipe(
          map(articlesArrays => articlesArrays.flat()),
          map(articles => {
            this.articlesCache = articles;
            return articles;
          }),
          catchError(() => of(this.articlesCache))
        );
      })
    );
  }

  private fetchArticlesForFeed(url: string): Observable<Article[]> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      switchMap(xml => this.xmlParser.parseXML(xml)),
      map(parsedXml => {
        const feedType = this.xmlParser.detectFeedType(parsedXml);
        return this.xmlParser.parseFeed(parsedXml, feedType);
      }),
      map(items => items.map(item => this.convertToArticle(item, url))),
      catchError(error => {
        console.error('Error fetching feed:', error);
        return of([]);
      })
    );
  }

  private convertToArticle(item: any, feedUrl: string): Article {
    return {
      id: item.link || Date.now().toString(),
      title: item.title,
      content: item.description,
      publishDate: new Date(item.pubDate),
      link: item.link,
      feedUrl: feedUrl
    };
  }

  private refreshArticles() {
    this.getAllArticles().subscribe();
  }
}
