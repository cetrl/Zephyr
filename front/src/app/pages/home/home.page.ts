import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../models/article.model';
import { FeedService } from '../../services/feed.service';
import { IonicModule } from '@ionic/angular';
import { ArticlePreviewComponent } from '../../components/article-preview/article-preview.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ArticlePreviewComponent, RouterModule]
})
export class HomePage implements OnInit {
  recentArticles$!: Observable<Article[]>;

  constructor(private feedService: FeedService) {}

  ngOnInit() {
    this.recentArticles$ = this.feedService.getRecentArticles();
  }
}
