import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FeedListViewModel } from '../../view-models/feed-list.view-model';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.page.html',
  styleUrls: ['./feed-list.page.scss'],
  providers: [FeedListViewModel]
})
export class FeedListPage {
  constructor(
    public vm: FeedListViewModel,
    private alertController: AlertController
  ) {}

  async presentAddFeedAlert() {
    const alert = await this.alertController.create({
      header: 'Add New Feed',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Feed Title'
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
            if (data.title && data.url) {
              this.vm.addFeed(data.title, data.url);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
