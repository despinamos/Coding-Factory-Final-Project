import { inject, Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { SchoolClass } from '../interfaces/class';
import { Router } from '@angular/router';

const API_URL = `${environment.apiURL}/api/classes`
const API_URL_AUTH = `${environment.apiURL}/api/auth`

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  createClass(schoolClass: SchoolClass) {
    return this.http.post<{status: boolean, data: SchoolClass}>(`${API_URL}`, schoolClass)
  }
  
}
