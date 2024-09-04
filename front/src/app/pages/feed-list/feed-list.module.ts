import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedListPageRoutingModule } from './feed-list-routing.module';

import { FeedListPage } from './feed-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedListPageRoutingModule
  ],
  declarations: [FeedListPage]
})
export class FeedListPageModule {}
