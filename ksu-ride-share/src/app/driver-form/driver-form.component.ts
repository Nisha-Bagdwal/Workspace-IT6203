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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
    MatSidenavModule,
    MatSnackBarModule
  ],
  providers: [StudentInfoService, DriverService]
})

export class DriverFormComponent {

  public mode = 'Add'; //default mode
  private id: any; //driver ID
  private driver: any;

  action = "Register";

  constructor(private formBuilder: FormBuilder,
    private _myService: StudentInfoService,
    private _myDriverService: DriverService,
    private router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit';
        this.action = 'Update';
        this.id = paramMap.get('_id');

        this._myDriverService.getDriver(this.id).subscribe({
          next: (data => {
            this.driver = data;
            this.profileForm.patchValue({
              studentId: this.driver.studentId,
              firstName: this.driver.firstName,
              lastName: this.driver.lastName,
              email: this.driver.email,
              phone: this.driver.phone,
              carInfo: {
                licensePlateNumber: this.driver.carInfo.licensePlateNumber,
                carMake: this.driver.carInfo.carMake,
                carModel: this.driver.carInfo.carModel,
                carColor: this.driver.carInfo.carColor
              }
            });

            (this.profileForm.get('availabilities') as FormArray).clear();

            this.driver.availabilities.forEach((availability: any) => {
              const availabilityFormGroup = this.createAvailabilityFormGroup();
              availabilityFormGroup.patchValue(availability);
              (this.profileForm.get('availabilities') as FormArray).push(availabilityFormGroup);
            });
          }),

          error: (err => console.error(err)),
          complete: (() => console.log('finished loading'))
        });
      }
      else {
        this.mode = 'Add';
        this.action = "Register";
        this.id = null;
      }
    });
  }

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

    if (this.mode == 'Add')
      this._myDriverService.addDriver(this.profileForm.value);
    if (this.mode == 'Edit')
      this._myDriverService.updateDriver(this.id, this.profileForm.value)

    this.router.navigate(['/listDrivers']);
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
