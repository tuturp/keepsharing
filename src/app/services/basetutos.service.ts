import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Tuto} from '../models/tuto.model';
import {User} from '../models/user.model';




@Injectable()

export class BasetutoService{
  idd : number;
  idsd : number;
ngOnInit(){
  }
  tutoSubject = new Subject<any[]>();
  NameDossierNewTutosSubject = new Subject<any>();
  baseDeDonnees: any[] ;
  NameDossierButton: string = null;
  NameDossierNewTutos: string = null;
  SousDossierNewTutos: any[];
  DossierUsers: any[];
  DossierUserCourant: User = null;
  ListAddTutoUser: any[];
  ListFavoritesTutosUser: any[];
  DossierTutosVrac: any[]=[];

  emitNameDossierNewTutosSubject(){
    this.NameDossierNewTutosSubject.next(this.NameDossierNewTutos.slice());
  }
  emittutoSubject(){
    this.tutoSubject.next(this.baseDeDonnees);
  }

  getTutos() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/baseDeDonnees').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }



selectionDossierNewTuto = function( idd: number,idsd: number) {
    this.idd = idd;
    this.idsd = idsd;
    this.getNameDossierButton(this.idd, this.idsd).then(
      (NameDossierButton: string) => {
        this.NameDossierButton = NameDossierButton;
      }
    );
    this.getNameDossierNewTutos(this.idd).then(
      (NameDossierNewTutos: string) => {
        this.NameDossierNewTutos = NameDossierNewTutos ;
      }
    );
    this.emitNameDossierNewTutosSubject();
    this.getSousDossierNewTutos(this.idd ,this.idsd).then(
      (SousDossierNewTutos: any[]) => {
        this.SousDossierNewTutos = SousDossierNewTutos;
      }
    );
    this.getDossierUsers().then(
      (DossierUsers: any[]) => {
        this.DossierUsers = DossierUsers;
      }
    );
};

  getSousDossierNewTutos(idd: number,idsd: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/baseDeDonnees/'+idd+ '/catégories/'+ idsd + '/tutos').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  getNameDossierNewTutos(idd : number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/baseDeDonnees/'+idd+ '/value').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  getNameDossierButton(idd : number,idsd: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/baseDeDonnees/'+idd+'/catégories/'+idsd + '/value').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  getDossierUsers() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/UserInfo').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  getListTutoUser(){
    this.DossierUsers.forEach(
      (item)=>{
        if(item.srcp== firebase.auth().currentUser.uid){
          this.ListAddTutoUser = item.addTutos;
          this.ListFavoritesTutosUser = item.favorites;
        }
      }
    )
 }

saveTutos(idd : number,idsd: number) {
   firebase.database().ref('/baseDeDonnees/'+idd+ '/catégories/'+ idsd + '/tutos').set(this.SousDossierNewTutos);
   firebase.database().ref('/UserInfo/').set(this.DossierUsers);

}

inL:number=0;
inList(L: any[], elmt:any){
  if(L){
    this.inL=0;
    L.forEach((item)=>{
      if(item.id ==elmt.id){this.inL=1;}
    })
    if(this.inL==1){return true;}else{return false;}
  }else{return false;}
}
getIndex(L: any[], elmt: any){
  L.forEach((item, index:number)=>{
    if(item.id ==elmt.id){return index;}
  })
}


compt: number=0;
addToFavorites(vid: Tuto){
  this.compt=0;
  this.getDossierUsers().then(
    (DossierUsers: any[]) => {
      this.DossierUsers = DossierUsers;
      this.DossierUsers.forEach((item)=>{
        if(item.srcp == firebase.auth().currentUser.uid){
          this.DossierUserCourant = item;
        }
      })
      if(this.DossierUserCourant == null){
        this.DossierUserCourant = new User();
        this.DossierUserCourant.srcp = firebase.auth().currentUser.uid;
      }
      if (this.DossierUserCourant.favorites) {
        if(this.inList(this.DossierUserCourant.favorites, vid)){
          this.DossierUserCourant.favorites.splice(+this.getIndex(this.DossierUserCourant.favorites, vid),1);
        }else{
          this.DossierUserCourant.favorites.push(vid);
          }
      }else{
        this.DossierUserCourant.favorites = [vid];
        }
      this.compt = 0;
      this.DossierUsers.forEach((item)=>{
        if(item.srcp == firebase.auth().currentUser.uid){
          firebase.database().ref('/UserInfo/'+ this.compt + '/').set(this.DossierUserCourant);
        }
        if(item){this.compt++};
      }
    )
    this.compt = 0;
    this.getDossierUsers().then(
      (DossierUsers: any[]) => {
        this.DossierUsers = DossierUsers;
        this.getListTutoUser();
      }
    );
    }
  );


  }






createNewTuto(newTuto: Tuto, idd : number,idsd: number) {
  this.SousDossierNewTutos.push(newTuto);
  this.DossierUserCourant = null;
  this.DossierUsers.forEach((item)=>{
    if(item.srcp == firebase.auth().currentUser.uid){
      this.DossierUserCourant = item;
    }
  })
  if(this.DossierUserCourant == null){
    this.DossierUserCourant = new User();
    this.DossierUserCourant.srcp = firebase.auth().currentUser.uid;
    this.DossierUsers.push(this.DossierUserCourant);
  }
  console.log(this.DossierUserCourant);
  if (this.DossierUserCourant.addTutos) {
    this.DossierUserCourant.addTutos.push(newTuto);
  }else{
    this.DossierUserCourant.addTutos = [newTuto];
    }
  console.log(this.DossierUserCourant);
  this.compt = 0;
  this.DossierUsers.forEach((item)=>{
    if(item.srcp == firebase.auth().currentUser.uid){
      firebase.database().ref('/UserInfo/'+ this.compt + '/').set(this.DossierUserCourant);
    }
    if(item){this.compt++};
  }
  )
  this.compt = 0;
  this.saveTutos(idd ,idsd );
  this.emittutoSubject();
}

getDossierTutosVrac(D:any[]){
  D.forEach(
    (item)=>{
      item.catégories.forEach(
        (sousitem)=>{
          sousitem.tutos.forEach(
            (sousousitem)=>{
              this.DossierTutosVrac.push(sousousitem);
            }
          );
        }
      );
    }
  );
}






}

