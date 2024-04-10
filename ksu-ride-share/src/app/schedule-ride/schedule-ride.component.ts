import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { StudentInfoService } from '../student-info.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RideService } from '../ride.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-schedule-ride',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    NgxMatTimepickerModule,
    HttpClientModule],
  templateUrl: './schedule-ride.component.html',
  styleUrl: './schedule-ride.component.css',
  providers: [StudentInfoService, RideService]
})
export class ScheduleRideComponent implements OnInit {

  availableRides: any[] = [];

  public mode = 'Add'; //default mode
  private id: any; //ride ID
  private rideInfo: any;

  action = "Schedule";

  constructor(private formBuilder: FormBuilder,
    private _myService: StudentInfoService,
    private router: Router,
    private _myRideService: RideService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['formSubmitted'] === 'Booked') {
        // Show the snackbar
        this.snackBar.open('Ride booked successfully!', 'Dismiss', {
          duration: 4000, // Display for 4 seconds
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit';
        this.action = 'Update';
        this.id = paramMap.get('_id');

        this._myRideService.getRide(this.id).subscribe({
          next: (data => {
            this.rideInfo = data;
            this.profileForm.patchValue({
              studentId: this.rideInfo.rider.studentId,
              firstName: this.rideInfo.rider.firstName,
              lastName: this.rideInfo.rider.lastName,
              email: this.rideInfo.rider.email,
              phone: this.rideInfo.rider.phone,
              searchRide: {
                sourceCampus: this.rideInfo.rider.searchRide.sourceCampus,
                destinationCampus: this.rideInfo.rider.searchRide.destinationCampus,
                dayOfRide: this.rideInfo.rider.searchRide.dayOfRide,
                timeOfRide: this.rideInfo.rider.searchRide.timeOfRide,
              }
            });

            this.availableRides.push(this.rideInfo.ride);
          }),

          error: (err => console.error(err)),
          complete: (() => console.log('finished loading'))
        });
      }
      else {
        this.mode = 'Add';
        this.action = "Schedule";
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
    searchRide: this.formBuilder.group({
      sourceCampus: ['', Validators.required],
      destinationCampus: ['', Validators.required],
      dayOfRide: ['', Validators.required],
      timeOfRide: ['', Validators.required]
    })
  });

  onSubmit() {
    console.log(this.profileForm.value);
    this._myRideService.searchAvailableRides(this.profileForm.value).subscribe({
      next: (availableRides: any) => {
        console.log("availableRides - " + availableRides);
        this.availableRides = availableRides;
      },
      error: (err => console.error(err)),
      complete: (() => console.log('finished loading'))
    });
  }

  bookRide(rideInfo: any) {

    const scheduledRide = {
      ride: rideInfo,
      rider: this.profileForm.value
    };

    if (this.mode == 'Add') {
      this._myRideService.bookRide(scheduledRide).subscribe({
        next: (response: any) => {
          console.log("Response Book Ride : " + response);
          const queryParams = { formSubmitted: 'Booked' };
          location.href = this.router.createUrlTree(['/scheduleRide'], { queryParams }).toString();
        },
        error: (err => console.error(err))
      });
    } else if (this.mode == 'Edit') {
      this._myRideService.updateRide(this.id, scheduledRide).subscribe({
        next: (response: any) => {
          console.log("Response Update Ride : " + response);
          const queryParams = { formSubmitted: 'Updated' };
          location.href = this.router.createUrlTree(['/scheduledRides'], { queryParams }).toString();
        },
        error: (err => console.error(err))
      });
    }
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

