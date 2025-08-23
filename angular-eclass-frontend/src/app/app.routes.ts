import { Routes } from '@angular/router';
import { UserLogin } from './components/user-login/user-login';
import { UserRegistration } from './components/user-registration/user-registration';
import { Welcome } from './components/welcome/welcome';
import { authGuard } from './shared/guards/auth-guard';
import { CreateClass } from './components/create-class/create-class';
import { StudentTable } from './components/student-table/student-table';
import { ClassTable } from './components/class-table/class-table';
import { RestrictedContent } from './components/restricted-content/restricted-content';
import { adminRoleGuard } from './shared/guards/admin-role-guard';
import { StudentClassTable } from './components/student-class-table/student-class-table';
import { StudentPersonalInfo } from './components/student-personal-info/student-personal-info';
import { EnrollInClass } from './components/enroll-in-class/enroll-in-class';

export const routes: Routes = [
    {path: 'login', component: UserLogin},
    {path: 'user-register', component:UserRegistration, canActivate: [authGuard, adminRoleGuard]},
    {path: 'create-class', component:CreateClass, canActivate: [authGuard, adminRoleGuard]},
    {path: 'all-students', component:StudentTable, canActivate: [authGuard, adminRoleGuard]},
    {path: 'all-classes', component:ClassTable, canActivate: [authGuard, adminRoleGuard]},
    {path: 'enroll-in-class', component:EnrollInClass, canActivate: [authGuard]},
    {path: 'student-classes', component:StudentClassTable, canActivate: [authGuard]},
    {path: 'student-info', component:StudentPersonalInfo, canActivate: [authGuard]},
    {path: 'restricted-content', component:RestrictedContent},
    {path: 'welcome', component:Welcome},
    {path: '', redirectTo:'/welcome', pathMatch:'full'}
];