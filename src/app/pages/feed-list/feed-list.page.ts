import { Component } from '@angular/core';
import { FeedListViewModel } from '../../view-models/feed-list.view-model';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.page.html',
  styleUrls: ['./feed-list.page.scss'],
  providers: [FeedListViewModel]
})
export class FeedListPage {
  constructor(public vm: FeedListViewModel) {}
}
