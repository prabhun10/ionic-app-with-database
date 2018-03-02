import { Component,ViewChild } from '@angular/core';
// import { Nav,Platform ,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';


import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { LogoutPage } from '../pages/logout/logout';



import { AlertController,LoadingController } from 'ionic-angular';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  name:any;

  pages: Array<{title: string, component: any}>;

  constructor(public storage: Storage,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public events: Events, alertCtrl: AlertController, loading: LoadingController) {

    //storage.set('URL', 'http://localhost:8888/rukmani');
    this.pages = [
          { title: 'Home', component: DashboardPage },
          { title: 'Account', component: ProfilePage },
          { title: 'Logout', component: LogoutPage }


          //{ title: 'List', component: ListPage },
          // { title: 'Account', component: MyaccountPage },
          // { title: 'Password change', component: PasswordPage },
          // { title: 'Logout', component: LoginPage }



        ];

        this.events.subscribe('login:name',(object) => {
             this.name = object['name'];
             });


        storage.get('custname').then((val) => {
               this.name = val; console.log(this.name);

});

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }



  openPage(page) {
   // Reset the content nav to have just this page
   // we wouldn't want the back button to show in this scenario
   this.nav.push(page.component);
 }
}
