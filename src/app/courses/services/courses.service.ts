import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../courses/model/course';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API_PATH = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  listCourses() {
    return this.httpClient.get<Course[]>(this.API_PATH)
      .pipe(
        first(),
        //delay(5000),
        tap(course => console.log(course))
      );
  }

  save(record: Course) {
    return this.httpClient.post<Course>(this.API_PATH, record).pipe(first());
  }
}
