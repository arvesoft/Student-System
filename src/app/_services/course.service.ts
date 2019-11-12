import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
import {Course, User} from 'src/app/_models';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://192.168.180.132/api';

  getTakingCourses(name:string) :Observable<Course[]>{
    const params = new HttpParams()
      .set('username', name );
    return this.http.get<Course[]>(`${this.baseUrl}/takingCourses.php`,{params});
  }
  getAvailableCourses(name:string) :Observable<Course[]>{
    const params = new HttpParams()
      .set('username', name );
    return this.http.get<Course[]>(`${this.baseUrl}/availableCourses.php`,{params});
  }
  registerCourse(username:string,name:string,section:number) {
    return this.http.post(`${this.baseUrl}/registerCourse.php`, {
      username: username,
      name: name,
      section: section
    });
  }
}
