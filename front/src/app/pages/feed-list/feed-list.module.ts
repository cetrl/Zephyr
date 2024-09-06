import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedListPageRoutingModule } from './feed-list-routing.module';

import { FeedListPage } from './feed-list.page';

import { FeedListViewModel } from 'src/app/view-models/feed-list.view-model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedListPageRoutingModule
  ],
  declarations: [FeedListPage],

  providers: [FeedListViewModel]
})
export class FeedListPageModule {}

