import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentUser } from 'src/app/shared/interfaces/student-user';
import { CommonModule } from '@angular/common';
import { StudentUserService } from 'src/app/shared/services/student-user.service';

@Component({
  selector: 'app-student-table',
  imports: [CommonModule],
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
}