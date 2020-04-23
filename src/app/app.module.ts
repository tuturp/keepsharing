import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { PresentationComponent } from './presentation/presentation.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import {BasetutoService} from "./services/basetutos.service";
import{Routes, RouterModule} from '@angular/router';
import { AuthService } from './services/auth.service';
import { FourofourComponent } from './fourofour/fourofour.component';
import {AuthGuard} from './services/auth-guard.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ShareComponent } from './share/share.component';
import { TutosSelect } from './services/tutos-select.service';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';




const appRoutes: Routes = [
  {path : 'information', component : PresentationComponent},
  {path: 'searchtips',canActivate: [AuthGuard],  component : HomeComponent},
  {path:'auth', component: LoginComponent},
  {path : 'share',canActivate: [AuthGuard], component : ShareComponent},
  {path : 'userCourses',canActivate: [AuthGuard], component : UserCoursesComponent},
  {path : 'userProfil',canActivate: [AuthGuard], component : UserProfilComponent},
  {path : 'auth/subscribe' , component : SubscribeComponent},
  {path : '' , component: PresentationComponent},
  {path : 'not-found' , component : FourofourComponent},
  {path : '**', redirectTo : '/not-found'}

];

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    LoginComponent,
    HomeComponent,
    SubscribeComponent,
    FourofourComponent,
    HeaderComponent,
    FooterComponent,
    ShareComponent,
    UserProfilComponent,
    UserCoursesComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' },
    BasetutoService,
    AuthService,
    AuthGuard,
    TutosSelect,
    HomeComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
