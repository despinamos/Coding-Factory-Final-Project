import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { SchoolClass } from 'src/app/shared/interfaces/class';
import { CommonModule } from '@angular/common';
import { ClassService } from 'src/app/shared/services/class.service';
import { StudentUserService } from 'src/app/shared/services/student-user.service';
import { StudentClassService } from 'src/app/shared/services/student-class.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { StudentClass } from 'src/app/shared/interfaces/student-user';

@Component({
  selector: 'app-class-table',
  imports: [CommonModule, MatIconModule, MatButton],
  standalone: true,
  templateUrl: './class-table.html',
  styleUrl: './class-table.css'
})
export class ClassTable implements OnInit{
  constructor(private cdr: ChangeDetectorRef) {};
  classes: SchoolClass[] = [];
  classesOfStudent: SchoolClass[] = [];
  classService = inject(ClassService);
  studentUserService = inject(StudentUserService)
  studentClassService = inject(StudentClassService);
  loading = true;
  user = this.studentUserService.user$;

  ngOnInit(): void {
    this.classService.getAllClasses().subscribe({
      next: (response) => {
        console.log("Getting classes request", response);
        this.classes = response;
        console.log("classes>>", this.classes);
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error fetching classes', err);
        this.loading = false;
      }
    });
  }

  editClass(clss: SchoolClass) {

  }

  enrollInClass(clss: SchoolClass) {
    const studentUsername = this.user().username;
    const className = clss.class;
    console.log("Student ", studentUsername, " requests to enroll for class ", className);

    const data: StudentClass = {
      'username': studentUsername,
      'class': className
    }
    console.log("data before check>>>", data)

    this.studentClassService.getClassesForStudent(this.user()).subscribe({
      next: (response) => {
        console.log("Getting classes for student request", response);
        this.classesOfStudent = response;
        console.log("student classes>>", this.classesOfStudent);
        
        for(let i=0; i < this.classesOfStudent.length; i++) {
          if (this.classesOfStudent[i].class === clss.class) {
            alert("You are already enrolled in this class!!!");
            data.username = "";
            data.class = "";
            return;
          }
        }

        console.log("data after check>>>", data)

         if(data.username === "" || data.class === "") {
        console.log("Enrollment not submitted.");
        } else {
          this.studentClassService.createClassInStudent(data).subscribe({
            next: (response) => {
              console.log("Student enrolled...", response);
            },
            error: (response) => {
              console.log("Student not enrolled...", response.error.data.errorResponse.errmsg);
            }
          })
        }
      },
      error: (err) => {
        console.error('Error fetching classes', err);
      }
    });
  }

  deleteClass(clss: SchoolClass) {
    this.classService.deleteAClass(clss).subscribe({
      next: (response) => {
        console.log("Deleting a class request", response);
        const indexOfDeletedClass = this.classes.indexOf(clss);
        this.classes.splice(indexOfDeletedClass, 1)
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error deleting class', err);
      }
    })
  }

}
