import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //@Input() valuesFromHome:any;
  @Output() cancelRegister =new EventEmitter();
  model:any={};
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.Register(this.model).subscribe(() =>{
      console.log('Register successful');
      
    },error=>{
      console.log(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancel')
  }

}
