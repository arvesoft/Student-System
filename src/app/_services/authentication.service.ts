import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/app/_models';
import { environment } from '@environments/environment';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public username:string;
    public userType:string;
    baseUrl = 'http://192.168.180.132/api';
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));

        this.currentUser = this.currentUserSubject.asObservable();
        this.username
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${this.baseUrl}/login.php`, {
            username: username,

            password: password

        })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('userName',username);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.username = localStorage.getItem('userName');

                localStorage.setItem('userType', user["UserType"]);
                this.userType = localStorage.getItem('userName');
                this.currentUserSubject.next(user);
                //alert(user.username);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
      localStorage.removeItem('userName');

      localStorage.removeItem('userType');
        this.currentUserSubject.next(null);
    }
}
