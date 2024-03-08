import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentService } from './student.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from './student-form/student-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, StudentFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [StudentService]
})

export class AppComponent implements OnInit {
  title ='Students App';
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
}
