import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ProfilePage } from '../profile/profile';


import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  user: any;
  data:any;
  headers:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController,public alertCtrl: AlertController,public http: Http,public storage: Storage) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');


    this.http.post('http://192.168.0.104/rukmani/dashboard.php', {headers: this.headers})
    .subscribe(res => {

this.user = res.json().Package;

      if(res.json().success == 0 ){

        console.log(res.json().data);
        console.log(res.json().message);
      //  this.navCtrl.setRoot(DashboardPage);

    } else if(res.json().success == 1){

        console.log(res.json().success);
        console.log(res.json().message);
      }

 });




}

edit(){
   this.navCtrl.push(ProfilePage);
console.log("profile page")
   }


   logout(){
      this.storage.remove('intCustomerid');
      this.navCtrl.setRoot(HomePage);

   }
//   logout(){
//   let loader = this.loading.create({
//     content: 'Processing. Please wait...',
//   });
//     loader.present().then(() => {
//   this.navCtrl.setRoot(HomePage);
//
//
//      loader.dismiss();
//
// //console.log("loign asdas")
//   })
// }

}
