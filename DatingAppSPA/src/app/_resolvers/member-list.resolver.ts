import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";

@Injectable({
    providedIn: 'root'
})
export class MemberListResolver implements Resolve<User[]>{

    constructor(private userService: UserService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers().pipe(
            catchError(error => {
                console.log(error);
                this.router.navigate(['/home']);
                return of(null)
            })
        );
    }

}