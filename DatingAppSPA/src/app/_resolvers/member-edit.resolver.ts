import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { AuthService } from "../_services/Auth.service";
import { UserService } from "../_services/user.service";

@Injectable({
    providedIn: 'root'
})
export class MemberEditResolver implements Resolve<User>{

    constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        var token = this.authService.decodeToken();
        console.log(token);
        return this.userService.getUser(token.nameid).pipe(
            catchError(error => {
                console.log(error);
                this.router.navigate(['/matches']);
                return of(null)
            })
        );
    }

}