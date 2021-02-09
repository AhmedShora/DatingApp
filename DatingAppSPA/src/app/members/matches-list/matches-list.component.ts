import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.css']
})
export class MatchesListComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data['allUsers'];
    });
  }
  //we will use resolver to retrieve data instead of using loadUsers method
  // loadUsers(){
  //   this.userService.getUsers().subscribe((users:User[])=>{
  //     this.users=users;
  //   },error=>{
  //     console.log(error);
  //   });
  //}

}

