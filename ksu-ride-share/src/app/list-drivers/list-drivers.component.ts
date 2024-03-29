import { Component } from '@angular/core';
import { DriverService } from '../driver.service';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [MatTableModule, RouterModule, HttpClientModule, CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css',
  providers: [DriverService]
})
export class ListDriversComponent {

  public drivers: any;

  constructor(private _myService: DriverService) { }

  ngOnInit() {
    this.getDrivers();
  }
  //method called OnInit
  getDrivers() {
    this._myService.getDrivers().subscribe({
      //read data and assign to public variable students
      next: (data => { this.drivers = data }),
      error: (err => console.error(err)),
      complete: (() => console.log('finished loading'))
    });
  }

  deleteDriver(driverId: any) {
    this._myService.deleteDriver(driverId);
  }

}
