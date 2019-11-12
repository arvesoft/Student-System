import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/_models';
import { UserService, AuthenticationService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
    selector: 'home',
    styleUrls: ['home.component.css'],
    templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    userName:string;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        //this.currentUser = this.authenticationService.currentUserSubject.value;
        this.userName = localStorage.getItem('userName');
        this.getUser(this.userName);
        this.currentUser = new User();
    }

    ngOnInit() {


        //this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }
    getUser(userName:string){
        this.userService.getUser(this.userName).pipe(first()).subscribe(
            response => {
                this.currentUser.username = response['username'];
                this.currentUser.FirstName = response['FirstName'];
                this.currentUser.LastName = response['LastName'];
                this.currentUser.UserType = response['UserType'];
                if(this.currentUser.UserType == "Student"){
                    this.currentUser.Depcode = response['Depcode'];
                    this.currentUser.Mail = response['Mail'];
                    this.currentUser.SemesterNo = response['SemesterNo'];
                }
                else if(this.currentUser.UserType == "Instructor"){
                    this.currentUser.Depcode = response['Depcode'];
                }

            }
        );
        //console.log(this.currentUser.username);
        //alert(this.currentUser.username);
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}
