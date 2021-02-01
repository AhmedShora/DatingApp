import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};
  name:string;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  Login(){
    this.authService.Login(this.model).subscribe(next => {
      console.log("Login Successed")
    },error =>{
      console.log("Faild To Login")
    },
    ()=>{
      this.router.navigate(['/matches']);
    });
  }

  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);

  }

  LoggedIn(){
    if(localStorage.getItem('token')){
      this.name = this.authService.helper.decodeToken(localStorage.getItem('token')).unique_name;
    }
    return this.authService.LoggedIn();  
  }

}
