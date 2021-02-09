import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";

@Injectable({
    providedIn: 'root'
})
export class MemberDetailsResolver implements Resolve<User>{

    constructor(private userService: UserService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                console.log(error);
                this.router.navigate(['/matches']);
                return of(null)
            })
        );
    }

}