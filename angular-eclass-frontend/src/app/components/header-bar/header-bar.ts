import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StudentUserService } from 'src/app/shared/services/student-user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  imports: [RouterLink, MatIconModule],
  templateUrl: './header-bar.html',
  styleUrl: './header-bar.css'
})
export class HeaderBar {

  studentUserService = inject(StudentUserService);
  user = this.studentUserService.user$;

  logout(){
    this.studentUserService.logoutUser();
  }

}
