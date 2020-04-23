import { Component, OnInit } from '@angular/core';
import {BasetutoService} from '../services/basetutos.service';
import * as firebase from 'firebase';
import { Tuto} from '../models/tuto.model';
import{User} from '../models/user.model';





@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css']
})
export class UserCoursesComponent implements OnInit {

  constructor(private basetutoService : BasetutoService) { }
  baseDeDonnees : any[];
  DossierUsers: any[];
  ListAddTutoUser: any[];
  ListFavoritesTutosUser: any[];

  ngOnInit() {
    this.basetutoService.getTutos().then(
      (baseDeDonnees: any[]) => {
        this.baseDeDonnees = baseDeDonnees;
      }
    );
    this.basetutoService.getDossierUsers().then(
      (DossierUsers: any[]) => {
        this.basetutoService.DossierUsers = DossierUsers;
        this.basetutoService.getListTutoUser();
      }
    );
    /*this.basetutoService.getDossierUsers().then(
      (DossierUsers: any[]) => {
        this.DossierUsers = DossierUsers;
        this.getListTutoUser();
      }
    );*/
  }
getListTutoUser(){
   this.basetutoService.DossierUsers.forEach(
     (item)=>{
       if(item.srcp== firebase.auth().currentUser.uid){
         this.ListAddTutoUser = item.addTutos;
         this.ListFavoritesTutosUser = item.favorites;
       }
     }
   )
}



addToFavorites(vid: any, D: any[]){
  this.basetutoService.addToFavorites(vid);
}





}


