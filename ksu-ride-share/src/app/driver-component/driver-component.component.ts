import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './driver-component.component.html',
  styleUrl: './driver-component.component.css'
})

export class DriverComponentComponent {

  constructor(private formBuilder: FormBuilder) { }

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
