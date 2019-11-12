import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
//import {DashboardComponent} from "src/app/dashboard";
import { AuthGuard } from './_helpers';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {InstructorViewComponent} from "./instructor-view/instructor-view.component";

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'Instructor', component: InstructorViewComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
