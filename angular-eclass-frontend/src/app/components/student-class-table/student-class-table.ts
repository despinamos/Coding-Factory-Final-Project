import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { SchoolClass } from 'src/app/shared/interfaces/class';
import { CommonModule } from '@angular/common';
import { StudentClassService } from 'src/app/shared/services/student-class.service';
import { StudentUserService } from 'src/app/shared/services/student-user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-class-table',
  imports: [CommonModule, MatIconModule],
  standalone: true,
  templateUrl: './student-class-table.html',
  styleUrl: './student-class-table.css'
})
export class StudentClassTable implements OnInit{
  constructor(private cdr: ChangeDetectorRef) {};
  classes: SchoolClass[] = [];
  studentClassService = inject(StudentClassService);
  studentUserService = inject(StudentUserService);
  user = this.studentUserService.user$;
  username = this.user().username;
  loading = true;

  ngOnInit(): void {
    this.studentClassService.getClassesForStudent(this.user()).subscribe({
      next: (response) => {
        console.log("Getting classes for student request", response);
        this.classes = response;
        console.log("student classes>>", this.classes);
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error fetching classes', err);
        this.loading = false;
      }
    });
  }

  deleteClass(clss: SchoolClass) {
    this.studentClassService.deleteClassFromStudent(this.username, clss).subscribe({
      next: (response) => {
        console.log("Deleting class for student request", response);
        const indexOfDeletedClass = this.classes.indexOf(clss);
        this.classes.splice(indexOfDeletedClass, 1)
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error deleting class for student', err);
        this.loading = false;
      }
    });
  }
}
