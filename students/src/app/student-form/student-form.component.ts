import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})

export class StudentFormComponent {

  //initialize the call using StudentService 
  constructor(private _myService: StudentService) { }

  studentForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  onSubmit() {
    let firstName = this.studentForm.get('firstName')?.value ?? "";
    let lastName = this.studentForm.get('lastName')?.value ?? "";
    console.log("You submitted: " + firstName + " " + lastName);
    this._myService.addStudents(firstName, lastName);
  }
}