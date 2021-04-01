import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../_models/message";
import { AuthService } from "../_services/Auth.service";
import { UserService } from "../_services/user.service";

@Injectable({
    providedIn: 'root'
})
export class MessagesResolver implements Resolve<Message[]>{
    pageNumber = 1;
    pageSize = 5;
    messageContainer = "Unread"
    constructor(private userService: UserService, private authService: AuthService,
        private notifier: NotifierService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        var token = this.authService.decodeToken();

        return this.userService.getMessages(token.nameid, this.pageNumber,
            this.pageSize, this.messageContainer)
            .pipe(
                catchError(error => {
                    console.log(error);
                    this.notifier.notify('error', "Error retreving messages")
                    this.router.navigate(['/home']);
                    return of(null)
                })
            );
    }

}
