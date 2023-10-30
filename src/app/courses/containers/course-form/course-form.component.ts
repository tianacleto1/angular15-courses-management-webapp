import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  formGroup = this.formBuilder.group({
    _id: [''],
    name: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100) ]
    ],
    category: ['', [
      Validators.required
    ]]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    // this.formGroup = this.formBuilder.group({
    //   name: [null],
    //   category: [null]
    // });
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['courseResolver'];
    this.formGroup.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });
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

  getErrorMessage(fieldName: string) {
    const field = this.formGroup.get(fieldName);

    if (field?.hasError('required')) {
      return 'Field is required!';
    }

    if (field?.hasError('minlength')) {
      const minLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Min length is ${minLength} chars long!`;
    }

    if (field?.hasError('maxlength')) {
      const minLength = field.errors ? field.errors['maxlength']['requiredLength'] : 120;
      return `Max length is ${minLength} chars long!`;
    }

    return 'Field is invalid!';
  }

  private onSuccess() {
    this.snackBar.open('Course saved successfully!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('An error ocurred when saving course!', '', { duration: 3000 });
  }

}
