import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
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
  currentUser:User;
  photoUrl=new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl=this.photoUrl.asObservable();
  constructor(private http: HttpClient) { }
  changeMemberPhoto(photoUrl:string){
    this.photoUrl.next(photoUrl);
  }

  Login(model: any) {

    return this.http.post(this.baseURL + 'login/', model).pipe(
      map(
        (response: any) => {
          const user = response;
         // console.log(user);
          //to ckeck if user have any thing inside or null
          if (user) {
            localStorage.setItem('token', user.token);
            //token must put as string but user.user is a json
            localStorage.setItem('user',JSON.stringify(user.user));
            this.currentUser= user.user;
            this.changeMemberPhoto(this.currentUser.photoUrl);

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
