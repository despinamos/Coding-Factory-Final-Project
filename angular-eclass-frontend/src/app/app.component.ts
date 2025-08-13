import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderBar } from './components/header-bar/header-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('angular-eclass-frontend');
}
