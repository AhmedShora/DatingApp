import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.css']
})
export class MatchesListComponent implements OnInit {

  users: User[];
  user:User=JSON.parse(localStorage.getItem('user'));
  genderList=[{value:'male',display:'Males'},{value:'female',display:'Females'}];
  userParams:any={};
  pagination: Pagination;
  constructor(private userService: UserService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data['allUsers'].result;
      this.pagination = data['allUsers'].pagination;
    });
     this.userParams.gender=this.user.gender==='female'?'male':'female';
     this.userParams.minAge=18;
     this.userParams.maxAge=99;
     this.userParams.orderBy='lastActive';

  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log("current Page"+this.pagination.currentPage+"\n total items"+this.pagination.totalItems);
    console.log("itemPerPage"+this.pagination.itemPerPage+"\n total Pages"+this.pagination.totalPages);
    this.loadUsers();
  }
  resetFilters(){
    this.userParams.gender=this.user.gender==='female'?'male':'female';
    this.userParams.minAge=18;
    this.userParams.maxAge=99;
    this.loadUsers();
  }
  //we will use resolver to retrieve data instead of using loadUsers method
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemPerPage,this.userParams).subscribe(
      (res: PaginationResult<User[]>) => {
        this.users =res.result;
        this.pagination=res.pagination
      }, error => {
        console.log(error);
      });
  }

}

