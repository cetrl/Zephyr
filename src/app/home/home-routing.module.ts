import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FeedListPage } from '../pages/feed-list/feed-list.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'feed',
    component: FeedListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
