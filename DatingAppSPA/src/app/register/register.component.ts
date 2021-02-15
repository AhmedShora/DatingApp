import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
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
  constructor(private authService:AuthService,private notifier:NotifierService) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.Register(this.model).subscribe(() =>{
      //console.log('Register successful');
      this.notifier.notify('success',"Register Successed!");

      
    },error=>{
      console.log(error);
      this.notifier.notify('error',"error in register!");
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancel')
  }

}
