import { Component } from '@angular/core';
import { RideService } from '../ride.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scheduled-rides',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './scheduled-rides.component.html',
  styleUrl: './scheduled-rides.component.css',
  providers: [RideService]
})
export class ScheduledRidesComponent {
  public rides: any;

  constructor(private _myService: RideService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getScheduledRides();
    this.route.queryParams.subscribe((params) => {
      if (params['formSubmitted'] === 'Deleted') {
        // Show the snackbar
        this.snackBar.open('Ride deleted successfully!', 'Dismiss', {
          duration: 4000, // Display for 4 seconds
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }else if (params['formSubmitted'] === 'Updated') {
        // Show the snackbar
        this.snackBar.open('Ride updated successfully!', 'Dismiss', {
          duration: 4000, // Display for 4 seconds
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    });
  }
  
  getScheduledRides() {
    this._myService.getScheduledRides().subscribe({
      next: (data => { this.rides = data }),
      error: (err => console.error(err)),
      complete: (() => console.log('finished loading'))
    });
  }

  deleteRide(rideId: any) {
    this._myService.deleteRide(rideId).subscribe({
      next: (response => { console.log(response) 
        const queryParams = { formSubmitted: 'Deleted' };
        location.href = this.router.createUrlTree(['/scheduledRides'], { queryParams }).toString();}),
      error: (err => console.error(err))
    });
  }
}
