import { Component } from '@angular/core';
import { ClassTable } from "../class-table/class-table";
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-enroll-in-class',
  imports: [ClassTable, MatButton, RouterLink],
  templateUrl: './enroll-in-class.html',
  styleUrl: './enroll-in-class.css'
})
export class EnrollInClass {

}
