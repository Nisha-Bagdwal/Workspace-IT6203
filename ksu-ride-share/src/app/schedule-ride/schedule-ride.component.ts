import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-schedule-ride',
  standalone: true,
  imports: [ReactiveFormsModule, 
    CommonModule, 
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    NgxMatTimepickerModule],
  templateUrl: './schedule-ride.component.html',
  styleUrl: './schedule-ride.component.css'
})
export class ScheduleRideComponent {

  constructor(private formBuilder: FormBuilder) { }

  profileForm = this.formBuilder.group({
    studentId: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    scheduledRide: this.formBuilder.group({
      sourceCampus: ['', Validators.required],
      destinationCampus: ['', Validators.required],
      dayOfRide: ['', Validators.required],
      timeOfRide: ['', Validators.required]
    })
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  studentMap: { [key: string]: { firstName: string; lastName: string; phone: string; email: string; }
  } = {
    '123': {
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'john.doe@example.com'
    },
    '321': {
      firstName: 'Annie',
      lastName: 'Frank',
      phone: '6789012345',
      email: 'annie.frank@example.com'
    }
  };

  onStudentIdChange(): void {
    const studentId = this.profileForm.get('studentId')?.value;
    if (studentId) {
      const student = this.studentMap[studentId];
      if (student) {
        this.profileForm.patchValue({
          firstName: student.firstName,
          lastName: student.lastName,
          phone: student.phone,
          email: student.email
        });
      }else{
        this.profileForm.patchValue({
          firstName: '',
          lastName: '',
          phone: '',
          email: ''
        });
      }
    }
  }

}
