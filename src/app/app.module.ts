import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProfilePage } from '../pages/profile/profile';
import { LogoutPage } from '../pages/logout/logout';



import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { HttpModule } from '@angular/http';

//import { NgModule, ErrorHandler } from '@angular/core';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    DashboardPage,
    ProfilePage,
    LogoutPage

  ],
  imports: [
    BrowserModule,
     HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    DashboardPage,
    ProfilePage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

constructor(public storage: Storage, public platform: Platform) {

  this.storage.set('url','http://192.168.0.103/rukmani/');
}

}
