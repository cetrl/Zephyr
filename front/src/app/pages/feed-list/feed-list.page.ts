import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FeedListViewModel } from '../../view-models/feed-list.view-model';
import { Observable } from 'rxjs';
import { Feed } from '../../models/feed.model';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.page.html',
  styleUrls: ['./feed-list.page.scss'],
})
export class FeedListPage implements OnInit {
  feeds$: Observable<Feed[]>;

  constructor(
    public vm: FeedListViewModel,
    private alertController: AlertController
  ) {
    this.feeds$ = this.vm.feeds$;
  }

  ngOnInit() {
    this.vm.refreshFeeds();
  }

  async presentAddFeedAlert() {
    const alert = await this.alertController.create({
      header: 'Add New Feed',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Feed name'
        },
        {
          name: 'url',
          type: 'url',
          placeholder: 'Feed URL'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.name && data.url) {
              this.vm.addFeed(data.name, data.url);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
