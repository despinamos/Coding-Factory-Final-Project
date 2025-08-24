import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentClassService } from 'src/app/shared/services/student-class.service';
import { StudentUserService } from 'src/app/shared/services/student-user.service';
import { ClassesPerStudent } from 'src/app/shared/interfaces/student-user';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SchoolClass } from 'src/app/shared/interfaces/class';

@Component({
  selector: 'app-student-class-table-for-admin',
  imports: [CommonModule, MatButton, MatIconModule, RouterLink],
  templateUrl: './student-class-table-for-admin.html',
  styleUrl: './student-class-table-for-admin.css'
})
export class StudentClassTableForAdmin implements OnInit{
  constructor(private cdr: ChangeDetectorRef) {};
  classesPerStudent: ClassesPerStudent[] = [];
  studentClassService = inject(StudentClassService);
  studentUserService = inject(StudentUserService);
  loading = true;

  ngOnInit(): void {
    this.studentClassService.getAllClassesPerStudent().subscribe({
      next: (response) => {
        console.log("Getting all classes for each student request", response);
        this.classesPerStudent = response;
        console.log("student classes>>", this.classesPerStudent);
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error fetching classes', err);
        this.loading = false;
      }
    });
  }

  deleteClassFromStudent(username: string, clss: SchoolClass) {
    this.studentClassService.deleteClassFromStudent(username, clss).subscribe({
      next: (response) => {
        console.log("Deleting class for student request", response);
        const indexOfStudent = this.classesPerStudent.findIndex(x => x.username === username);
        const indexOfDeletedClass = this.classesPerStudent[indexOfStudent].classes.indexOf(clss);
        this.classesPerStudent[indexOfStudent].classes.splice(indexOfDeletedClass, 1)
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error deleting class for student', err);
        this.loading = false;
      }
    });
  }
}