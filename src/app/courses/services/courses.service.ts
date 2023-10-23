import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
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
        //delay(3000),
        tap(course => console.log(course))
      );
  }

  getById(id: string) {
    return this.httpClient.get<Course>(`${this.API_PATH}/${id}`)
  }

  save(record: Partial<Course>) {
    if (record._id) {
      return this.update(record);
    }

    return this.create(record);
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API_PATH}/${id}`).pipe(first());
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API_PATH, record).pipe(first());
  }

  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API_PATH}/${record._id}`, record).pipe(first());
  }
}
