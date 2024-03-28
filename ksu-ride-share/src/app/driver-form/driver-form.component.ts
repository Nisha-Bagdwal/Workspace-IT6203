import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { StudentInfoService } from '../student-info.service';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgxMatTimepickerModule,
  ],
  providers: [StudentInfoService, DriverService]
})

export class DriverFormComponent {
  constructor(private formBuilder: FormBuilder,
    private _myService: StudentInfoService,
    private _myDriverService: DriverService) { }

  profileForm = this.formBuilder.group({
    studentId: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    carInfo: this.formBuilder.group({
      licensePlateNumber: [''],
      carMake: [''],
      carModel: [''],
      carColor: ['']
    }),
    availabilities: this.formBuilder.array([
      this.createAvailabilityFormGroup()
    ])
  });

  createAvailabilityFormGroup(): FormGroup {
    return this.formBuilder.group({
      sourceCampus: [''],
      destinationCampus: [''],
      availableDay: [''],
      availableTime: ['']
    });
  }

  addAvailability(): void {
    (this.profileForm.get('availabilities') as FormArray).push(this.createAvailabilityFormGroup());
  }

  get availabilities() {
    return this.profileForm.get('availabilities') as FormArray;
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this._myDriverService.addDriver(this.profileForm.value);
  }

  onStudentIdChange(): void {
    const studentId = this.profileForm.get('studentId')?.value;
    if (studentId) {
      this._myService.getStudentInfo(studentId).subscribe({
        next: (studentInfo: any) => {
          console.log("studentInfo : " + studentInfo)
          if (studentInfo) {
            this.profileForm.patchValue({
              firstName: studentInfo.firstName,
              lastName: studentInfo.lastName,
              phone: studentInfo.phone,
              email: studentInfo.email
            });
          } else {
            this.profileForm.patchValue({
              firstName: '',
              lastName: '',
              phone: '',
              email: ''
            });
          }
        },
        error: (err => console.error(err)),
        complete: (() => console.log('finished loading'))
      });
    }
  }
}
