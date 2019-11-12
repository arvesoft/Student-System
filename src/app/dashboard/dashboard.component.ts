import {Component, OnInit, PipeTransform, ViewChild,AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Course, User} from 'src/app/_models';
import {AlertService,CourseService, UserService, AuthenticationService } from 'src/app/_services';
import { DecimalPipe } from '@angular/common';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {NgZone} from '@angular/core';
import {first, take} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'dashboard',
  styleUrls: ['dashboard.component.css'],
  templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  loading = false;
  selectedCourse:string;
  selectedSection:number;
  addCourseForm: FormGroup;
  courses:Course[] = null;
  availableCourses:Course[] = [];
  uniqueCourses:string[];
  submitted = false;
  currentUser: User;
  availableSections:number[] = [];
  userName:string;
  displayedColumns: string[] = ['CourseCode', 'CourseName', 'Section'];
  dataSource = new MatTableDataSource(this.courses);
  public arr: Array<[string, number]> = [];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private courseService: CourseService,
    private _ngZone: NgZone,
    private alertService: AlertService

  ) {
    this.userName = localStorage.getItem('userName');

    //this.dataSource = new MatTableDataSource(t);
    this.getCourses(this.userName);
    this.getAvailableCourses(this.userName);



  }

  ngOnInit() {

    this.addCourseForm = this.formBuilder.group({
      AvailableCourseList: [''],
      AvailableSectionList:['']



    });
    //alert(this.cache)
    //console.log(JSON.stringify(this.courses) )
    //alert(this.courses[0].CourseCode);
  }


  changeCourse(e) {
    this.uniqueCourses =Array.from(new Set((this.availableCourses).map((item: Course) => item.CourseCode)));
    //this.uniqueCourses = this.availableCourses.map((x:Course) => x.CourseCode);

    console.log(this.uniqueCourses);
    if(e.target.value != "Select a Course"){
      this.availableSections = [];
      for(let i in this.availableCourses){
        if( e.target.value ==  this.availableCourses[i]["CourseCode"]){
          this.availableSections.push(this.availableCourses[i]["Section"])
        }
        this.arr.push([this.availableCourses[i]["CourseCode"],this.availableCourses[i]["Section"]]);
      }

    }
    this.selectedCourse = e.target.value;
  }
  changeSection(e){
    this.selectedSection = e.target.value;
  }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.addCourseForm.invalid) {
      return;
    }
    this.loading = true;
    this.courseService.registerCourse(this.userName,this.selectedCourse,this.selectedSection)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Course Registration successful', true);
          this.router.navigate(['/']);
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  getAvailableCourses(username:string){
    this.courseService.getAvailableCourses(this.userName).subscribe(
      (response:Course[])=>{
        this.availableCourses =  response ;
        this.uniqueCourses =Array.from(new Set((this.availableCourses).map((item: Course) => item.CourseCode)));
      });

  }



  getCourses(username:string){
    this.courseService.getTakingCourses(this.userName).subscribe(
      (response:Course[])=>{
        this.courses =  response ;
      }
    )

    //console.log(this.currentUser.username);
    //alert(this.currentUser.username);
  }
}



