import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyBWoymYjh6fG4apZf3hFQSfzQmi8RC1rFY",
    authDomain: "neargreen-a34db.firebaseapp.com",
    databaseURL: "https://neargreen-a34db.firebaseio.com",
    projectId: "neargreen-a34db",
    storageBucket: "neargreen-a34db.appspot.com",
    messagingSenderId: "310476513527"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
