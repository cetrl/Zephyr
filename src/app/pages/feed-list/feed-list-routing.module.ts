import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedListPage } from './feed-list.page';

const routes: Routes = [
  {
    path: '',
    component: FeedListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedListPageRoutingModule {}
