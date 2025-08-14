import { Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { 
  AbstractControl,
  FormArray,
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { StudentUser } from 'src/app/shared/interfaces/student-user';
import { StudentUserService } from 'src/app/shared/services/student-user.service';

@Component({
  selector: 'app-user-registration',
  imports: [
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.css'
})
export class UserRegistration {
  studentUserService = inject(StudentUserService);

  registrationStatus: {success: boolean, message: string} = {
    success: false,
    message: 'Not attempted yet'
  }

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormGroup({
      area: new FormControl(''),
      road: new FormControl('')
    }),
    phone : new FormArray([
      new FormGroup({
        number: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required)
      })
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
  },
    this.passwordConfirmValidator,
);

  passwordConfirmValidator(control: AbstractControl):
  {
    [key:string]: boolean} | null {
    const form = control as FormGroup;
    
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value

    if(password && confirmPassword && password!==confirmPassword) {
      form.get('confirmPassword')?.setErrors({passwordMismatch: true})
      return {passwordMismatch: true}
    }
    
    return null
  }

   phone = this.form.get('phone') as FormArray;

  // addPhoneNumber() {
  //   this.phone.push(
  //     new FormGroup({
  //       number: new FormControl('', Validators.required),
  //       type: new FormControl('', Validators.required)
  //     })
  //   )
  // }

  // removePhoneNumber(index: number){
  //   this.phone.removeAt(index);
  // }

  onSubmit(){
    const data: StudentUser = {
      'username': this.form.get('username')?.value || '',
      'password': this.form.get('password')?.value || '',
      'firstname': this.form.get('firstname')?.value || '',
      'lastname': this.form.get('lastname')?.value || '',
      'age': this.form.get('age')?.value || 0,
      'email':this.form.get('email')?.value || '',
      'address': {
        'area':this.form.controls.address.controls.area?.value || '',
        'road': this.form.controls.address.controls.road?.value || ''
      },
      phone: this.phone.controls.map(ctrl => ({
        number: ctrl.get('number')?.value || '',
        type: ctrl.get('type')?.value || ''
      }))
    }
    console.log(data);
    this.studentUserService.registerUser(data)
      .subscribe({
        next: (response) => {
          console.log("User Saved...", response);
          this.registrationStatus = {success: true, message: "User registered"}
        },
        error: (response) => {
          console.log("User not Saved...", response.error.data.errorResponse.errmsg)
          this.registrationStatus = {success: false, message: response.error.data.errorResponse.errmsg}
        }
      })
    
  }

  // check_duplicate_email(){
  //   const email = this.form.get("email")?.value;

  //   if (email){
  //     console.log("email", email);
  //     this.studentUserService.check_duplicate_email(email)
  //       .subscribe({
  //         next: (response) => {
  //           console.log("Email OK",response);
  //           this.form.get("email")?.setErrors(null)
  //         },
  //         error: (response) => {
  //           console.log(response);
  //           const message = response.data;
  //           console.log("Email not OK",message);
  //           this.form.get('email')?.setErrors({dublicateEmail: true})
  //         }
  //       })
  //   }
  // }

  registerAnother(){
    this.form.reset()
    this.registrationStatus = {success:false, message: "Not attempted yet"}
  }

}