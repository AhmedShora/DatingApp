import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Pagination, PaginationResult } from '../_models/pagination';
import { User } from '../_models/user';
import { AuthService } from '../_services/Auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;
  constructor(private authService: AuthService, private userService: UserService,
    private notifier: NotifierService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemPerPage,null,this.likesParam).subscribe(
      (res: PaginationResult<User[]>) => {
        this.users =res.result;
        this.pagination=res.pagination
      }, error => {
        console.log(error);
      });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log("current Page"+this.pagination.currentPage+"\n total items"+this.pagination.totalItems);
    console.log("itemPerPage"+this.pagination.itemPerPage+"\n total Pages"+this.pagination.totalPages);
    this.loadUsers();
  }

}
