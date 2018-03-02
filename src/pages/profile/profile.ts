import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  submitAttempt: boolean = false;
frmProfile: FormGroup;
Name:any;
  Email:any;
  Mobile:any;
  Userval: any;
  intCustomerid:any;
  user:any;
  jsonurl: any;
  value:any;



  constructor(public navCtrl: NavController, public navParams: NavParams,public loading: LoadingController,public alertCtrl: AlertController,public formBuilder: FormBuilder,public storage: Storage,public http: Http) {




    let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');


      //  console.log(res.json().intCustomerid);


      storage.get('custid').then((val) => {
             this.intCustomerid = val; console.log(this.intCustomerid);

             this.storage.get('url').then((val) => {
         this.jsonurl = val;console.log(this.jsonurl);

            let user = {
              Userid 		: this.intCustomerid
            };

            this.http.post(this.jsonurl+'profile.php',JSON.stringify(user), {headers: headers})
            .subscribe(res => {




              this.intCustomerid	    = res.json().intCustomerid;
              this.Name         = res.json().vFullname;
              this.Email        = res.json().vEmail;
              this.Mobile       = res.json().bMobile;


    });
            });



          });





    this.frmProfile = formBuilder.group({
   		  txtName	    : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
         txtEmail	  : ['', Validators.compose([Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i), Validators.required])],
         txtMobile 	: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9 ]*'), Validators.required])],
        // txtid	    : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

   	  });




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }



  Updateprofile(){
      console.log("boom"); //console.log('dob',this.frmProfile.controls['txtDOB'].value); console.log('name',this.frmProfile.controls['txtName'].value);
      this.submitAttempt = true;
      if(this.frmProfile.valid){
        let loader = this.loading.create({
          content: 'Processing. Please wait...',
        });

        this.storage.get('url').then((val) => {
    this.jsonurl = val;console.log(this.jsonurl);

        loader.present().then(() => {
          let user = {
            Userid    : this.intCustomerid,
            Name	: this.frmProfile.controls['txtName'].value,
            Mobile	: this.frmProfile.controls['txtMobile'].value,
            Email	: this.frmProfile.controls['txtEmail'].value

                    };
  //console.log('dob',this.frmProfile.controls['txtDOB'].value);
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');

            this.http.post(this.jsonurl+'updateprofile.php', JSON.stringify(user), {headers: headers}).map(res => res.json().success)
            .subscribe(res => {
              if(res == 0){
                let alert = this.alertCtrl.create({
                  title: 'Profile',
                  subTitle: 'Update Successfully!',
                  buttons: [{
                    text: 'OK',
                    handler: data => {
                    }
                  }]
                });
                alert.present();

              }else if(res == 1){
                let alert = this.alertCtrl.create({
                  title: 'Profile',
                  subTitle: 'Update failed, Please try again!',
                  buttons: [{
                    text: 'OK',
                    handler: data => {
                    }
                  }]
                });
                alert.present();

              }
            })

          loader.dismiss();
        });

            });
      }

    }








logout(){
   this.storage.remove('intCustomerid');
   this.navCtrl.setRoot(HomePage);

}



}
