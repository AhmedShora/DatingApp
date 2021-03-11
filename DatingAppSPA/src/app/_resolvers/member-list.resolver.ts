import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";

@Injectable({
    providedIn: 'root'
})
export class MemberListResolver implements Resolve<User[]>{
  pageNumber=1;
  pageSize=5;
    constructor(private userService: UserService,
      private notifier:NotifierService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber,this.pageSize).pipe(
            catchError(error => {
                console.log(error);
                this.notifier.notify('error',"Error retreving data")
                this.router.navigate(['/home']);
                return of(null)
            })
        );
    }

}
