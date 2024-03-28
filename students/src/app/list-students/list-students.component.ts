import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { StudentService } from '../student.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.css',
  providers: [StudentService]
})
export class ListStudentsComponent implements OnInit{
  //declare variable to hold response and make it public to be accessible from components.html
  public students: any;
  //initialize the call using StudentService 
  constructor(private _myService: StudentService) { }
  ngOnInit() {
    this.getStudents();
  }
  //method called OnInit
  getStudents() {
    this._myService.getStudents().subscribe({
      //read data and assign to public variable students
      next: (data => { this.students = data }),
      error: (err => console.error(err)),
      complete: (() => console.log('finished loading'))
    });
  }

  onDelete(studentId: string) {
    this._myService.deleteStudent(studentId);
  }
}
