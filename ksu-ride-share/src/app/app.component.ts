import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScheduleRideComponent } from './schedule-ride/schedule-ride.component';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { ScheduledRidesComponent } from './scheduled-rides/scheduled-rides.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScheduleRideComponent, DriverFormComponent, HomePageComponent, MatSidenavModule, MatListModule, RouterModule, ListDriversComponent, ScheduledRidesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ksu-ride-share';
}
