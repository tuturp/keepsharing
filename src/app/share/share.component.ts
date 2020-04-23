import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tuto} from '../models/tuto.model';
import { BasetutoService } from '../services/basetutos.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {HomeComponent} from '../home/home.component';



@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  tutoForm: FormGroup;
  fileUrl: string;
  fileIsUploading = false;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private basetutoService: BasetutoService,
              private router: Router , private homeComponent: HomeComponent) { }
              
  

  ngOnInit() {

    this.initForm();
  }
  detectFiles(event) {
    this.fileIsUploading = true;
    this.getTutosOnStorage(event.target.files[0]).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  };
  
  
  getTutosOnStorage(file: File){
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref('/tutos/'+ this.basetutoService.NameDossierNewTutos).child( '/'+almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
      
  }
  initForm() {
    this.tutoForm = this.formBuilder.group({
     subject: ['', Validators.required],
     content: ['', Validators.required],
     tuto: ['',Validators.required]
    });
  }
  
  onSaveTuto() {
    const subject = this.tutoForm.get('subject').value;
    const content= this.tutoForm.get('content').value;
    const tuto= this.tutoForm.get('tuto').value;
    const date: Date= new Date();
    const newTuto = new Tuto();
    newTuto.subject = subject;
    newTuto.content = content;
    newTuto.date = date.toString();
    newTuto.srcv =  tuto;
    newTuto.notes = '0';
    newTuto.srcp = firebase.auth().currentUser.uid;
    newTuto.id = this.fileUrl;
    this.basetutoService.createNewTuto(newTuto ,this.basetutoService.idd , this.basetutoService.idsd);
    this.router.navigate(['/information']);
  }



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





  
}
