import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as $ from 'jquery';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  


  $(function(){
    $(" footer a, #sitename a").click(function(event){
      event.preventDefault();
      var hash = this.hash;
      $('body,html').animate({scrollTop:$(hash).offset().top},900,function(){window.location.hash=hash});
    });
  
  });