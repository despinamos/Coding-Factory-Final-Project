import { inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { SchoolClass } from '../interfaces/class';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { ClassesPerStudent, LoggedInUser} from '../interfaces/student-user';
import { StudentClass } from '../interfaces/student-user';

const API_URL = `${environment.apiURL}/api/student-class`

@Injectable({
  providedIn: 'root'
})
export class StudentClassService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  getClassesForStudent(student: LoggedInUser): Observable<SchoolClass[]> {
  return this.http.get<{ status: boolean; data: { username: string; classes: SchoolClass[] } }>(
      `${API_URL}/${student.username}`
    )
    .pipe(
      map(response => response.data.classes)
    );
  }

  getAllClassesPerStudent(): Observable<ClassesPerStudent[]> {
  return this.http.get<{ status: boolean, data: ClassesPerStudent[]}>(
      `${API_URL}`
    )
    .pipe(
      map(response => response.data)
    );
  }

  createClassInStudent(studentClass: StudentClass) {
    return this.http.post<{status: boolean; data: {username: string; classes: SchoolClass[]}}>(
      `${API_URL}`, studentClass
    )
  }

  deleteClassFromStudent(student: LoggedInUser, clss: SchoolClass) {
    return this.http.delete<{status: boolean; data: {}}>(
      `${API_URL}/${student.username}/classes/${clss.class}`
    )
  }
}
