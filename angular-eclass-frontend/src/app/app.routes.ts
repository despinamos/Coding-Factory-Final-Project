import { Routes } from '@angular/router';
import { UserLogin } from './components/user-login/user-login';
import { UserRegistration } from './components/user-registration/user-registration';
import { Welcome } from './components/welcome/welcome';
import { authGuard } from './shared/guards/auth-guard';
import { CreateClass } from './components/create-class/create-class';

export const routes: Routes = [
    {path: 'login', component: UserLogin},
    {path: 'user-register', component:UserRegistration, canActivate: [authGuard]},
    {path: 'create-class', component:CreateClass, canActivate: [authGuard]},
    {path: 'welcome', component:Welcome},
    {path: '', redirectTo:'/welcome', pathMatch:'full'}
];