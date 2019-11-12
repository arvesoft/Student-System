import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models';
import { first } from 'rxjs/operators';
import { UserService, AuthenticationService } from 'src/app/_services';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  userType:string;
  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.userType = localStorage.getItem('userType');

  }


  ngOnInit() {
    //alert(this.userType);
    this.userType = localStorage.getItem('userType');
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}
