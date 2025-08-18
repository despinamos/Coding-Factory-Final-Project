import { Component,  inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentUser } from 'src/app/shared/interfaces/student-user';
import { CommonModule } from '@angular/common';
import { StudentUserService } from 'src/app/shared/services/student-user.service';

@Component({
  selector: 'app-student-personal-info',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './student-personal-info.html',
  styleUrl: './student-personal-info.css'
})
export class StudentPersonalInfo implements OnInit{

  constructor(private cdr: ChangeDetectorRef) {}
  student: StudentUser | undefined;
  studentUserService = inject(StudentUserService);
  user = this.studentUserService.user$;
  loading = true;

    ngOnInit(): void {
    this.studentUserService.getOneStudent(this.user()).subscribe({
      next: (response) => {
        console.log("Getting students personal info request", response);
        this.student = response;
        console.log("student>>", this.student);
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
