import { Routes } from '@angular/router';
import { UserLogin } from './components/user-login/user-login';
import { UserRegistration } from './components/user-registration/user-registration';
import { Welcome } from './components/welcome/welcome';
import { authGuard } from './shared/guards/auth-guard';
import { CreateClass } from './components/create-class/create-class';
import { StudentTable } from './components/student-table/student-table';
import { ClassTable } from './components/class-table/class-table';

export const routes: Routes = [
    {path: 'login', component: UserLogin},
    {path: 'user-register', component:UserRegistration, canActivate: [authGuard]},
    {path: 'create-class', component:CreateClass, canActivate: [authGuard]},
    {path: 'all-students', component:StudentTable, canActivate: [authGuard]},
    {path: 'all-classes', component:ClassTable, canActivate: [authGuard]},
    {path: 'welcome', component:Welcome},
    {path: '', redirectTo:'/welcome', pathMatch:'full'}
];