import { Component, inject } from '@angular/core';
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
import { SchoolClass } from 'src/app/shared/interfaces/class';
import { ClassService } from 'src/app/shared/services/class.service';

@Component({
  selector: 'app-create-class',
  imports: [
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './create-class.html',
  styleUrl: './create-class.css'
})
export class CreateClass {
  classService = inject(ClassService);

  creationStatus: {success: boolean, message: string} = {
    success: false,
    message: 'Not attempted yet'
  }

  form = new FormGroup({
    class: new FormControl('', Validators.required),
    hours: new FormControl(0, Validators.required),
    ects: new FormControl(0, Validators.required)
  });

  onSubmit(){
    const data: SchoolClass = {
      'class': this.form.get('class')?.value || '',
      'hours': this.form.get('hours')?.value || 0,
      'ects': this.form.get('ects')?.value || 0
    }

    console.log(data);
    this.classService.createClass(data)
      .subscribe({
        next: (response) => {
          console.log("Class Created ", response);
          this.creationStatus = {success: true, message: "Class Created"}
        },
        error: (response) => {
          console.log("Class not saved...", response.error.data.errorResponse.errmsg);
          this.creationStatus = {success: false, message: response.error.data.errorResponse.errmsg}
        }
      })
  }

  createAnother(){
    this.form.reset();
    this.creationStatus = {success:false, message: "Not attempted yet"}
  }
}