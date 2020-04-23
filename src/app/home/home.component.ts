import { Component, OnInit, Injectable } from '@angular/core';
import * as $ from 'jquery';
import {BasetutoService} from "../services/basetutos.service";
import * as firebase from 'firebase';
import {NgForm} from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent implements OnInit {
  baseDeDonees: any[];
  
  constructor(private basetutosService : BasetutoService ) {}
  baseDeDonnees: any[];
  tabUrlInit: string[] =['V1.mp4','V2.mp4','V3.mp4','V4.mp4','V5.mp4','V6.mp4','V7.mp4','V8.mp4'];
  tabUrlFinal: string []=[,,,,,,,];
  DossierFiltered :any[];
  
  ngOnInit() {
    this.basetutosService.getTutos().then(
      (baseDeDonnees: any[]) => {
        this.baseDeDonnees = baseDeDonnees;
        this.basetutosService.getDossierTutosVrac(this.baseDeDonnees);
      }
    );
    this.basetutosService.emittutoSubject();
    var i: number;
    for(i=0;i<8;i++){
      this.getUrlTuto(this.tabUrlInit[i],i);
      console.log(this.tabUrlFinal[i]);
    }
    this.basetutosService.getDossierUsers().then(
      (DossierUsers: any[]) => {
        this.basetutosService.DossierUsers = DossierUsers;
        this.basetutosService.getListTutoUser();
      }
    );

  }


//CLASSEMENT VIDEO PAR THEMES
dossierCourant = null;
dossierTotalCourant = null;
dossierCategorieCourant = null;
dossierTutosCourant = null; 
recherche: string;
  

getUrlTuto(scrc : string , i : number){
  firebase.storage().ref('/tutos').child('/' + scrc ).getDownloadURL().then(
    (url:string)=>{
      this.tabUrlFinal[i] = url;

    }
  );
}




selectInitialeDossier = function (dossier){
  this.dossierCourant = dossier;
};
selectInitialeDossierTotal = function (dossier){
  this.dossierTotalCourant= dossier;

};
selectInitialeDossierTheme = function (dossier){
  this.dossierThemeTotal = dossier;

};


selectInitialeTutos = function(dossier){
  this.dossierTutosCourant = dossier;
}


selectionDossier = function(dossier, ssdossier) {
  this.menuShow = 0;
  this.baseDeDonnees.forEach((item) =>{
  if (item.value == dossier){
    this.selectInitialeDossierTotal(item);
    this.selectInitialeDossier(item.catégories);
}
})


this.dossierCourant.forEach((item)=>{
if (item.value == ssdossier) {
  this.selectInitialeDossierTheme(item);
  this.selectInitialeTutos(item.tutos);
}
})
this.dossierTutosCourant.forEach((item)=>{
  console.log(item.srcv.substring(item.srcv.lastIndexOf("/")));
  firebase.storage().ref('/tutos/'+ this.dossierTotalCourant.value ).child(item.srcv.substring(item.srcv.lastIndexOf("/")) ).getDownloadURL().then(
    (url:string)=>{
      item.id = url;

    }
  ).catch(function(error) {
    console.log(error);
  });
})

};
menuSelection: number = 0;
menuSelector(n){
  this.menuSelection = n;
  return this.menuSelection;
  };
menuShow: number = 0;
menuShower(n){
  this.menuShow = n;
  return this.menuShow;
  };

  getSearchChanges(val){
    this.recherche = val.value;
    this.DossierFiltered = this.basetutosService.DossierTutosVrac.filter((vid)=>vid.subject.includes(this.recherche));
  }
  onsubmit(f: NgForm){
    this.recherche = f.value.search;
  }
  filtered(Dossier: any[], val:string){
    this.DossierFiltered = Dossier.filter((vid)=>{
      vid.subject.includes(val);
      console.log(val);
    });
    return this.DossierFiltered;
  }


}
$(function(){
  $(" footer a").click(function(event){
    event.preventDefault();
    var hash = this.hash;
    $('body,html').animate({scrollTop:$(hash).offset().top},900,function(){window.location.hash=hash});
  });


  $('.dropdown-submenu a.test').on("click", function(e){
    $("#list:not(this)").next('ul').hide();
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
 
});
