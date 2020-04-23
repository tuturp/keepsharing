import { Component } from '@angular/core';
import * as $ from 'jquery';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'keepSharing';


  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyALR9vHX_JZIFTknaQBlquNt2bSPUcNOck",
      authDomain: "keepsharing.firebaseapp.com",
      databaseURL: "https://keepsharing.firebaseio.com",
      projectId: "keepsharing",
      storageBucket: "keepsharing.appspot.com",
      messagingSenderId: "351458864294",
      appId: "1:351458864294:web:8b0f24a534279ed6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
  }

}

