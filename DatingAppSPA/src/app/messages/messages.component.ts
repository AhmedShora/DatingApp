import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Message } from '../_models/message';
import { Pagination, PaginationResult } from '../_models/pagination';
import { AuthService } from '../_services/Auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  constructor(private userService: UserService, private authService: AuthService,
    private route: ActivatedRoute, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    var token = this.authService.decodeToken();

    this.userService.getMessages(token.nameid, this.pagination.currentPage,
      this.pagination.itemPerPage, this.messageContainer)
      .subscribe((res: PaginationResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.notifier.notify("", error);;
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();

  }

  deleteMessage(id: number) {
    var check = confirm("Do you want to delete message?");
    if (check) {
      var decodeToken = this.authService.decodeToken();
      this.userService.deleteMessage(decodeToken.nameid, id).subscribe(() => {
        this.messages.splice(this.messages.findIndex(a => a.id === id), 1);
        this.notifier.notify("success", "Message is deleted successfully");
      }, err => {
        //console.log(err);
        this.notifier.notify("error", "Can not delete message now");
      });
    }
    else {
      this.notifier.notify("info", "canceled");
    }

  }
}
