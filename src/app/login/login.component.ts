import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import{AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/searchtips']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}


$(function(){
  $(" footer a").click(function(event){
    event.preventDefault();
    var hash = this.hash;
    $('body,html').animate({scrollTop:$(hash).offset().top},900,function(){window.location.hash=hash});
  });


});

