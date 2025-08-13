import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-menu-list',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.css'
})
export class MenuList {
  menu = [
    { text: 'Register New Student',
    linkName: '/user-register' },
    { text: 'Register New Class',
    linkName: '/create-class' },
    { text: 'View All Students',
    linkName: '/user-register' },
    { text: 'View All Classes',
    linkName: '/user-register' },
  ]
}