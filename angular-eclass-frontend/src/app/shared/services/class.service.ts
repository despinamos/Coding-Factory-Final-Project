import { inject, Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { SchoolClass } from '../interfaces/class';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

const API_URL = `${environment.apiURL}/api/classes`

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  getAllClasses(): Observable<SchoolClass[]> {
      return this.http.get<{status: boolean, data: SchoolClass[]}>(`${API_URL}`)
      .pipe(
        map(response => response.data)
      );
    }

  createClass(schoolClass: SchoolClass) {
    return this.http.post<{status: boolean, data: SchoolClass}>(`${API_URL}`, schoolClass)
  }

  deleteAClass(clss: SchoolClass) {
      return this.http.delete<{status: boolean, data: SchoolClass}>(`${API_URL}/${clss.class}`)
  }
}