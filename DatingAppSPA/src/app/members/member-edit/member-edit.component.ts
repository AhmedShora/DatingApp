import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { error } from 'protractor';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/Auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm") editForm: NgForm;
  user: User;

  constructor(private route: ActivatedRoute, private authService: AuthService, private notifier: NotifierService, private userService: UserService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    var token = this.authService.decodeToken();
    this.userService.updateUser(token.nameid, this.user).subscribe(next => {
      console.log(this.user);
      this.notifier.notify('success', "Edit Successed!");

      this.editForm.reset(this.user);
    }, error => {
      this.notifier.notify('error', "Error while Editing");

      console.log(error);

    });

  }

}
