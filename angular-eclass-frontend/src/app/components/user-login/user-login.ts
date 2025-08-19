import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Credentials, LoggedInUser } from 'src/app/shared/interfaces/student-user';
import { StudentUserService } from 'src/app/shared/services/student-user.service';
import { jwtDecode } from 'jwt-decode'
import { Router, ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css'
})
export class UserLogin implements OnInit {
  studentUserService = inject(StudentUserService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        const access_token = params["token"];
        if (access_token) {
          localStorage.setItem('access_token', access_token);
          const decodedTokenSubject = jwtDecode(access_token) as unknown as LoggedInUser
          console.log("OnInit", decodedTokenSubject);
          this.studentUserService.user$.set({
            username: decodedTokenSubject.username,
            email:decodedTokenSubject.email,
            roles: decodedTokenSubject.roles
          });
          this.router.navigate(['user-registration-example']);
        }
      })
  }  

  onSubmit(){
    console.log(this.form.value);
    const credentials = this.form.value as Credentials
    
    this.studentUserService.loginUser(credentials)
      .subscribe({
        next: (response) => {
          console.log("Logged in",response)
          const access_token = response.data;
          localStorage.setItem('access_token', access_token);
          
          const decodedTokenSubject = jwtDecode(access_token) as unknown as LoggedInUser
          console.log(decodedTokenSubject);

          this.studentUserService.user$.set({
            username: decodedTokenSubject.username,
            email: decodedTokenSubject.email,
            roles:decodedTokenSubject.roles
          });
          console.log("Signal>>>",this.studentUserService.user$());
          this.router.navigate(['welcome'])
        },
        error: (error) => {
          console.log("Not logged in",error)
        }
      })
  }

}
