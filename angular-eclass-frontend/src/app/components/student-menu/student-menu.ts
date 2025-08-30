import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-student-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './student-menu.html',
  styleUrl: './student-menu.css'
})
export class StudentMenu {
  menu = [
    { text: 'Enroll in new Class',
    linkName: '/enroll-in-class' },
    { text: 'View My Classes',
    linkName: '/student-classes' },
    { text: 'View Personal Info',
    linkName: '/student-info' }
  ]
}