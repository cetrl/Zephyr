import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedListPage } from './feed-list.page';
import { HomePage } from 'src/app/home/home.page';

const routes: Routes = [
  {
    path: '',
    component: FeedListPage
  },
  {
    path: '../home',
    component: HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedListPageRoutingModule {}
