import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';;
import { DashboardComponent } from './dashboard/dashboard.component'
import { MaterialModule } from './material';;
import { NavbarComponent } from './navbar/navbar.component';

import { MatPaginatorModule } from '@angular/material/paginator'
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";;

import { InstructorViewComponent } from './instructor-view/instructor-view.component';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
    ,
    MatTableModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule
  ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent
,
        DashboardComponent ,
        NavbarComponent ,
        InstructorViewComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    someVal:string;
 };
