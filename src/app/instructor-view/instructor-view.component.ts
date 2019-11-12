import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit,ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Student, Taking} from "../_models";
import {Course, User} from 'src/app/_models';
import {AlertService,CourseService, AuthenticationService } from 'src/app/_services';
import {StudentService} from "../_services/student.service";
import {NgZone} from '@angular/core';
import {first, take} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

/**
 * @title Table with selection
 */
@Component({
  selector: 'app-instructor-view',
  templateUrl: './instructor-view.component.html',
  styleUrls: ['./instructor-view.component.css']
})
export class InstructorViewComponent implements OnInit  {
  loading=false;
  selectedStudents:Student[];
  studentForm: FormGroup;
  taking:Taking[] = [];
  submitted = false;
  userName:string;
  displayedColumns: string[] = ['StudentID', 'CourseCode', 'Section'];
  dataSource = new MatTableDataSource<Taking>(this.taking);
  selection = new SelectionModel<Taking>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private courseService: CourseService,
              private studentService: StudentService,
              private _ngZone: NgZone,
              private alertService: AlertService){
    this.userName = localStorage.getItem('userName');
    //service functions will be called from here
    this.listStudents(this.userName);
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.studentForm = this.formBuilder.group({
      AvailableCourseList: [''],
      AvailableSectionList:['']
    });

  }
  public searchText() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toLowerCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  public searchTextForSubmit() {
    let input1,input2, filter1,filter2, table, tr, td, i, txtValue;
    input1 = document.getElementById("studentInput");
    input2 = document.getElementById("courseInput");
    filter1 = input1.value.toLowerCase();
    filter2 = input2.value.toLowerCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toLowerCase().indexOf(filter1)>-1 && txtValue.toLowerCase().indexOf(filter2) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  public sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  onSubmit() {
    //console.log(this.taking);
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.studentForm.invalid) {
      return;
    }
    this.loading = true;
    //************************************
    // function call for grade and discard
    //************************************



    /*this.courseService.registerCourse(this.userName,this.selectedCourse,this.selectedSection)
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
        });*/



  }

  listStudents(username:string){

    this.studentService.listStudents(this.userName).subscribe(
      (response:Taking[])=>{
        this.taking  = response ;
      });

  }










  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource<Taking>(this.taking);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */

}
