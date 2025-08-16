import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { SchoolClass } from 'src/app/shared/interfaces/class';
import { CommonModule } from '@angular/common';
import { ClassService } from 'src/app/shared/services/class.service';

@Component({
  selector: 'app-class-table',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './class-table.html',
  styleUrl: './class-table.css'
})
export class ClassTable implements OnInit{
  constructor(private cdr: ChangeDetectorRef) {};
  classes: SchoolClass[] = [];
  classService = inject(ClassService);
  loading = true;

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

}
