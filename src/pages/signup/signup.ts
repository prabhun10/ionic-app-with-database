import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http,Headers } from '@angular/http';





/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  frmSignup: FormGroup;
    submitAttempt: boolean = false;
    post:any;
    textName:any;
    textEmail:any;
    textMobile:any;
    textPassword:any;
    headers:any;
    jsonurl:any;
    regMailcheck:Boolean;



  constructor(public navCtrl: NavController, public http: Http,public loading: LoadingController,public storage: Storage, public navParams: NavParams ,public formBuilder: FormBuilder ,public toastCtrl  : ToastController,public alertCtrl: AlertController) {
this.regMailcheck = false;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    this.frmSignup = formBuilder.group({
    textName: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z]*'), Validators.required])],
    textEmail : ['', Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i)])],
    textMobile: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(20), Validators.pattern('[0-9]*'), Validators.required])],
    textPassword: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(10),Validators.required])]
   });

  }







  signup(){
    this.submitAttempt = true;

    this.storage.get('url').then((val) => {
this.jsonurl = val;console.log(this.jsonurl);
    if(this.frmSignup.valid){



      let user = {
        Name		: this.frmSignup.controls.textName.value,
        Email : this.frmSignup.controls.textEmail.value,
        Mobile		: this.frmSignup.controls.textMobile.value,
        Password  : this.frmSignup.controls.textPassword.value
  };


    this.http.post(this.jsonurl+'signup.php', JSON.stringify(user), {headers: this.headers})
    .subscribe(res => {
      if(res.json().success == 0 ){
        let alert = this.alertCtrl.create({
               title: 'thank u ',
               subTitle: 'registerd succesffully',
               buttons: [{
                 text: 'OK',
                 handler: data => {
                   this.navCtrl.setRoot(HomePage);
                 }
               }]
             });
             alert.present();

        console.log(res.json().data);
        console.log(res.json().message);
    //    this.navCtrl.setRoot(DashboardPage);
      } else {
        console.log(res.json().success);
        console.log(res.json().message);
      }

    })

}
 });
}

checkMail(){
   //console.log("foucys",this.frmSignup.controls['textEmail'].value);

           let loader = this.loading.create({
             content: 'Processing. Please wait...',
           });

           this.storage.get('url').then((val) => {
       this.jsonurl = val;console.log(this.jsonurl);
           loader.present().then(() => {

           let items = {
           Email		: this.frmSignup.controls['textEmail'].value,
           };

           let headers = new Headers();

           headers.append('Content-Type', 'application/x-www-form-urlencoded');


           this.http.post(this.jsonurl+'signupmail.php', JSON.stringify(items), {headers: headers})

           .subscribe(data => {

           if(data.json().success == 0){

           this.regMailcheck = true; console.log("Email Avail");

           if(this.frmSignup.controls['textEmail'].value == null || this.frmSignup.controls['textEmail'].value == ""){
             this.regMailcheck = false; console.log("Email Avail EM");
           }

           }else if(data.json().success == 1){

           this.regMailcheck = false;
           console.log("Email Not Avail");

           }

           });


           loader.dismiss();
           });
            });

 }

  backtoLogin(){
     this.navCtrl.setRoot(HomePage);
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }





}
