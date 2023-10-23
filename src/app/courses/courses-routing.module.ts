import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseFormComponent } from './containers/course-form/course-form.component';
import { CoursesComponent } from './containers/courses/courses.component';
import { CourseResolver } from './guards/course.resolver';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'add', component: CourseFormComponent, resolve: { courseResolver: CourseResolver }},
  { path: 'edit/:id', component: CourseFormComponent, resolve: { courseResolver: CourseResolver }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
