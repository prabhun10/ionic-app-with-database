import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController,Events } from 'ionic-angular';
import { FormBuilder ,FormGroup,Validators } from '@angular/forms';


import { SignupPage } from '../signup/signup';
import { DashboardPage } from '../dashboard/dashboard';

import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import { MenuController } from 'ionic-angular';
import { IonicPage, PopoverController } from 'ionic-angular';



@Component({
selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {

frmLogin: FormGroup;
submitAttempt: boolean = false;
textEmail:any;
textPassword:any;
posts: any;
data: any;
user:any;
headers:any;
jsonurl:any;


constructor(public navCtrl: NavController,public popoverCtrl: PopoverController, public menuCtrl : MenuController,public formBuilder: FormBuilder, public http: Http,public loading: LoadingController,public storage: Storage ,public alertCtrl: AlertController,public events: Events) {
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');

  this.frmLogin = this.formBuilder.group({
    textEmail : ['', Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i)])],
    textPassword: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(10), Validators.required])]
  });

}


login(){
        this.submitAttempt = true;
            if(this.frmLogin.valid){
                let loader = this.loading.create({
                  content: 'Processing. Please wait...',
                });
                    this.storage.get('url').then((val) => {
                    this.jsonurl = val;console.log(this.jsonurl);
//  console.log('email-',this.frmLogin.controls['textEmail'].value);
//  console.log('pass-',this.frmLogin.controls['textPassword'].value);
                    loader.present().then(() => {
                                          let user = {
                                            Email		: this.frmLogin.controls.textEmail.value,
                                            Password  : this.frmLogin.controls.textPassword.value
                                          };
                          this.http.post(this.jsonurl+'login.php', JSON.stringify(user), {headers: this.headers})
                          .subscribe(res => {
                            if(res.json().success == 0 ){
                              console.log("days NO!");
                          //  console.log(res.json().data);
                          console.log(res.json().intCustomerid);

                          this.storage.set('custid',res.json().intCustomerid)
                          .then((value) => {
                            console.log('storage : '+ value); // is empty...
                            });

                            console.log(res.json().name);
                            this.storage.set('custname',res.json().name)
                            .then((value) => {
                              console.log('storage name: '+ value); // is empty...
                            });

                            let myParam = {name: res.json().name};
                            this.events.publish('login:name',myParam);
                          let alert = this.alertCtrl.create({
                            title: 'Thank u!',
                            subTitle: 'logged succesffuuly',
                            buttons: [{
                              text: 'OK',
                              handler: data => {

                                this.navCtrl.setRoot(DashboardPage);
                              }
                            }]
                          });
                          alert.present();
                          console.log(res.json().data);
                          console.log(res.json().message);
                          this.navCtrl.setRoot(DashboardPage);
                        } else if(res.json().success == 1){
                          let alert = this.alertCtrl.create({
                            title: 'Faild to Login!',
                            subTitle: 'email is not regiterd',
                            buttons: [{
                              text: 'OK',
                              handler: data => {
                                this.navCtrl.setRoot(SignupPage);
                              }
                            }]
                          });
                          alert.present();
                          console.log(res.json().success);
                          console.log(res.json().message);
                        }
                        loader.dismiss();
                      });
                    })
                  });
                }

              }

signupnav(){
  this.navCtrl.setRoot(SignupPage);
  //console.log("loign asdas")
}


}
