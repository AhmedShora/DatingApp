import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { tap } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';
import { AuthService } from 'src/app/_services/Auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService,
    private authService: AuthService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages() {
    var token = this.authService.decodeToken();
    var currentUserId = +token.nameid;
    this.userService.getMessageThread(currentUserId, this.recipientId)
      .pipe(
        tap(messages => {
          for (let i = 0; i < messages.length; i++) {
            if (messages[i].isRead === false && messages[i].recipientId === currentUserId)
              this.userService.markAsRead(currentUserId, messages[i].id);
          }
        })
      )
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.notifier.notify("error", error);
      });
  }
  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    var token = this.authService.decodeToken();
    this.userService.sendMessage(token.nameid, this.newMessage)
      .subscribe((message: Message) => {
        this.messages.unshift(message);
        this.newMessage.content = '';
        //this.loadMessages();
      }, error => {
        this.notifier.notify("error", error);
      });
  }

}
