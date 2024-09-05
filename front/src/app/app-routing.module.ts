import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'feed-list',
    // lazyloading
    loadChildren: () => import('./pages/feed-list/feed-list.module').then( m => m.FeedListPageModule)
  },
  {
    path: 'article-detail',
    loadChildren: () => import('./pages/article-detail/article-detail.module').then( m => m.ArticleDetailPageModule)
  },

  {
    path: 'article/:id',
    loadChildren: () => import('./pages/article-detail/article-detail.module').then(m => m.ArticleDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
