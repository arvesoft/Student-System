import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
import { User } from 'src/app/_models';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
  baseUrl = 'http://192.168.180.132/api';
  
    getUser(name:string) :Observable<User>{
        const params = new HttpParams()
        .set('username', name );
        return this.http.get<User>(`${this.baseUrl}/getUser.php`,{params});
    }


    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
    register(user: User) {  
            return this.http.post(`${this.baseUrl}/register.php`, {
                username: user.username,
                firstName: user.FirstName,
                lastName: user.LastName,
                password: user.passwd,
                userType: user.UserType,
                depCode: user.Depcode,
                mail: user.Mail,
                semesterNo: user.SemesterNo
            });
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}
