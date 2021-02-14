import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = environment.apiUrl + 'auth/';
  helper = new JwtHelperService();
  decodedToken: any;
  constructor(private http: HttpClient) { }

  Login(model: any) {

    return this.http.post(this.baseURL + 'login/', model).pipe(
      map(
        (response: any) => {
          const user = response;
          //to ckeck if user have any thing inside
          if (user) {
            localStorage.setItem('token', user.token);

          }
        }
      )
    );
  }

  Register(model: any) {
    return this.http.post(this.baseURL + 'register', model);
  }

  LoggedIn() {
    var token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }

  decodeToken() {
    var token = localStorage.getItem('token');
    return this.decodedToken = this.helper.decodeToken(token);
  }
}
