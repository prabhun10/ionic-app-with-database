import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';


/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {


    this.storage.get('custid').then((val) => {

          if(val != null && val != 0){
            this.storage.remove('custid');
            this.storage.remove('custname');


            //this.navCtrl.setRoot(Login); //***** */
            this.navCtrl.setRoot(HomePage);



          }


    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
