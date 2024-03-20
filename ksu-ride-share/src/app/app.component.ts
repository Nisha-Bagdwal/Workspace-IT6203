import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScheduleRideComponent } from './schedule-ride/schedule-ride.component';
import { DriverFormComponent } from './driver-form/driver-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScheduleRideComponent, DriverFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ksu-ride-share';
}
