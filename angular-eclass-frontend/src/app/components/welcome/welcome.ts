import { Component, inject } from '@angular/core';
import { StudentUserService } from 'src/app/shared/services/student-user.service';
import { MenuList } from '../menu-list/menu-list';

@Component({
  selector: 'app-welcome',
  imports: [MenuList],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
  studentUserService = inject(StudentUserService);
  user = this.studentUserService.user$;

}
