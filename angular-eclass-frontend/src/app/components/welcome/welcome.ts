import { Component, inject } from '@angular/core';
import { StudentUserService } from 'src/app/shared/services/student-user.service';
import { MenuList } from '../menu-list/menu-list';
import { StudentMenu } from '../student-menu/student-menu';

@Component({
  selector: 'app-welcome',
  imports: [MenuList, StudentMenu],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
  studentUserService = inject(StudentUserService);
  user = this.studentUserService.user$;

}
