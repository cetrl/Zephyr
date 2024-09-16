import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FeedListViewModel } from '../../view-models/feed-list.view-model';
import { Observable } from 'rxjs';
import { Feed } from '../../models/feed.model';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.page.html',
  styleUrls: ['./feed-list.page.scss']
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

  async presentUpdateDelFeed(feed: Feed) {

    const alert = await this.alertController.create({
      buttons: [
        {
          text: 'Update',
          handler: () => this.presentUpdateFeedAlert(feed)
        },
        {
          text: 'Delete',
          handler: () => {
            this.vm.deleteFeed(feed._id as string);
            return false; // close the alert after deletion
          }
        }
      ]
    });

    await alert.present();
  }

  async presentUpdateFeedAlert(feed: Feed) {
    const alert = await this.alertController.create({
      header: 'Update Feed',
      inputs: [
        { name: 'name', type: 'text', value: feed.name, placeholder: 'Feed name' },
        { name: 'url', type: 'url', value: feed.url, placeholder: 'Feed URL' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Update',
          handler: ({ name, url }) => {
            if (name && url) {
              this.vm.updateFeed(feed._id as string, { ...feed, name, url });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAddFeedAlert() {
    const alert = await this.alertController.create({
      header: 'Add New Feed',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Feed name' },
        { name: 'url', type: 'url', placeholder: 'Feed URL' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: ({ name, url }) => {
            if (name && url) {
              this.vm.addFeed(name, url);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
