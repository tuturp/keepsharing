import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

$(function(){
  $(" footer a").click(function(event){
    event.preventDefault();
    var hash = this.hash;
    $('body,html').animate({scrollTop:$(hash).offset().top},900,function(){window.location.hash=hash});
  });


});