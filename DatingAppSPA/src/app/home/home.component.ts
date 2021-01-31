import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  values:any;
  registerClick:boolean=false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  toogleRegister(){

    this.registerClick=true;
  }
  CancelRegisterMode(registerMode:boolean){
    this.registerClick=registerMode;
  }

}
