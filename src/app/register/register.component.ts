import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService, UserService, AuthenticationService } from 'src/app/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    UserType = [];
    selectedType:any;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        /*if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }*/
      of(this.getOrders()).subscribe(UserType => {
        this.UserType = UserType;
      });

    }
  getOrders(){
    return [
      {id: '1',name: 'Admin'},
      {id: '2',name: 'Instructor'},
      {id: '3',name: 'Student'}
    ];
  }
  changeType(e) {
    this.selectedType = e.target.value;
  }
    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        passwd: ['', [Validators.required, Validators.minLength(6)]],
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        UserType: ['Admin', ],
        Depcode: [''],
        SemesterNo: [''],
        Mail: [''],


      });


    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
