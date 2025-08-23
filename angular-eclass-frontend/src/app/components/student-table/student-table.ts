import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentUser } from 'src/app/shared/interfaces/student-user';
import { CommonModule } from '@angular/common';
import { StudentUserService } from 'src/app/shared/services/student-user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-table',
  imports: [CommonModule, MatIconModule, MatButton, RouterLink],
  standalone: true,
  templateUrl: './student-table.html',
  styleUrl: './student-table.css'
})
export class StudentTable implements OnInit{
  constructor(private cdr: ChangeDetectorRef) {}
  students: StudentUser[] = [];
  studentUserService = inject(StudentUserService);
  loading = true;

  ngOnInit(): void {
    this.studentUserService.getAllStudents().subscribe({
      next: (response) => {
        console.log("Getting students request", response);
        this.students = response;
        console.log("students>>", this.students);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching students', err);
        this.loading = false;
      }
    });
  }

  editStudent(student: StudentUser) {
    
  }

  deleteStudent(student: StudentUser) {
    this.studentUserService.deleteAStudent(student).subscribe({
      next: (response) => {
        console.log("Deleting a student request", response);
        const indexOfDeletedStudent = this.students.indexOf(student);
        this.students.splice(indexOfDeletedStudent, 1)
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error deleting student', err);
      }
    })
  }
}