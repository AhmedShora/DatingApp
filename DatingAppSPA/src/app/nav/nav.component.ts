import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../_services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};
  name:string;
  photoUrl:string;
  constructor(private authService:AuthService,private router:Router,private notifier:NotifierService) { }

  ngOnInit(): void {
    this.authService.currentPhotoUrl.subscribe(photoUrl=>this.photoUrl=photoUrl);
  }

  Login(){
    this.authService.Login(this.model).subscribe(next => {
      console.log("Login Successed");
      this.notifier.notify('success',"Login Successed!");
    },error =>{
      //console.log("Faild To Login");
      this.notifier.notify('error',"Error Login!");

    },
    ()=>{
      this.router.navigate(['/matches']);
    });
  }

  Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken=null;
    this.authService.currentUser=null;

    this.router.navigate(['']);
    this.notifier.notify('info',"Logged Out Successed!");
  }

  LoggedIn(){
    if(localStorage.getItem('token')){
      this.name = this.authService.helper.decodeToken(localStorage.getItem('token')).unique_name;
    }
    return this.authService.LoggedIn();
  }

}
