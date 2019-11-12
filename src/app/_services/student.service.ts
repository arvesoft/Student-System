import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
import {Student, Taking} from 'src/app/_models';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = 'http://192.168.180.132/api';
  listStudents(name:string) :Observable<Taking[]>{
    const params = new HttpParams()
      .set('username', name );
    return this.http.get<Taking[]>(`${this.baseUrl}/listStudents.php`,{params});
  }
  constructor(private http: HttpClient) { }
}
