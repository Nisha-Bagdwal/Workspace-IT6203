import { Component } from '@angular/core';
import { DriverService } from '../driver.service';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private _myService: DriverService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getDrivers();
    this.route.queryParams.subscribe((params) => {
      if (params['formSubmitted'] === 'Deleted') {
        // Show the snackbar
        this.snackBar.open('Driver deleted successfully!', 'Dismiss', {
          duration: 4000, // Display for 4 seconds
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }else if (params['formSubmitted'] === 'Updated') {
        // Show the snackbar
        this.snackBar.open('Driver updated successfully!', 'Dismiss', {
          duration: 4000, // Display for 4 seconds
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    });
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
    this._myService.deleteDriver(driverId).subscribe({
      next: (response => { console.log(response) 
        const queryParams = { formSubmitted: 'Deleted' };
        location.href = this.router.createUrlTree(['/listDrivers'], { queryParams }).toString();}),
      error: (err => console.error(err))
    });
  }

}
