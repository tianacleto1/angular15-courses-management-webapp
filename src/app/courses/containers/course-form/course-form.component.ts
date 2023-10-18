import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  formGroup = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    // this.formGroup = this.formBuilder.group({
    //   name: [null],
    //   category: [null]
    // });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formGroup.value);
    this.service.save(this.formGroup.value)
                .subscribe(
                  result => this.onSuccess(),
                  err => this.onError()
                );
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Course saved successfully!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('An error ocurred when saving course!', '', { duration: 3000 });
  }

}
