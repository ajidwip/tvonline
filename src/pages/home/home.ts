import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tv = '';
  public channelindo = [];
  public channelsports = [];

  constructor(
    public navCtrl: NavController,
    private screenOrientation: ScreenOrientation,
    public api: ApiProvider,
    public platform: Platform) {
    this.tv = 'indonesia'
    this.doGetChannelIndonesia();
    this.doGetChannelSports();
  }
  ionViewDidEnter() {
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }
  goToLiveIndo(indo) {
    this.navCtrl.push('LivePage', {
      url: indo.url
    })
  }
  goToLiveSports(sports) {
    this.navCtrl.push('LivePage', {
      url: sports.url
    })
  }
  doGetChannelIndonesia() {
    this.api.get("table/z_channel", { params: { limit: 100, filter: "country=" + "'Indonesia'", sort: "channel_name" + " ASC " } })
      .subscribe(val => {
        this.channelindo = val['data']
      });
  }
  doGetChannelSports() {
    this.api.get("table/z_channel", { params: { limit: 100, filter: "category=" + "'Sports'", sort: "channel_name" + " ASC " } })
      .subscribe(val => {
        this.channelsports = val['data']
      });
  }
}
