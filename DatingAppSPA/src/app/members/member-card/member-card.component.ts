import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { error } from 'selenium-webdriver';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/Auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user:User;
  constructor(private authService:AuthService,private userService:UserService,
    private notifier:NotifierService) { }

  ngOnInit(): void {
  }

  sendLike(id:number){
    this.userService.sendLike(this.authService.decodeToken().nameid,id).subscribe(data=>{
      this.notifier.notify("success","You Liked "+this.user.knownAs);
    },
    error=>{
      this.notifier.notify("error","You Liked "+this.user.knownAs+" before");

    });
  }


}
