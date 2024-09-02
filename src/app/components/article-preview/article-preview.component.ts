import { Component, Input } from '@angular/core';
import { Article } from '../../models/article.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class ArticlePreviewComponent {
  @Input() article!: Article;
}
