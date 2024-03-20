import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DriverComponentComponent } from './driver-component/driver-component.component';
import { ScheduleRideComponent } from './schedule-ride/schedule-ride.component';
import { AddressFormComponent } from './address-form/address-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DriverComponentComponent, ScheduleRideComponent, AddressFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ksu-ride-share';
}
