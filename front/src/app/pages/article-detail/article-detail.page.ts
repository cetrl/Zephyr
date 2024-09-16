import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetailViewModel } from '../../view-models/article-detail.view-model';
import { Subscription } from 'rxjs';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
  providers: [ArticleDetailViewModel]
})
export class ArticleDetailPage implements OnInit, OnDestroy {
  article: Article | undefined;
  private articleSubscription: Subscription | undefined;

  constructor(
    public vm: ArticleDetailViewModel,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const feedId = params['feedId'];
      const articleIndex = +params['index'];

      if (feedId && !isNaN(articleIndex)) {
        this.vm.loadArticle(feedId, articleIndex);
      } else {
        console.error('routing error');
      }
    });
  }

  ngOnDestroy() {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }
}
