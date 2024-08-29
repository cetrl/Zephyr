import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetailViewModel } from '../../view-models/article-detail.view-model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
  providers: [ArticleDetailViewModel]
})
export class ArticleDetailPage implements OnInit {
  constructor(
    public vm: ArticleDetailViewModel,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vm.loadArticle(id);
    }
  }
}
