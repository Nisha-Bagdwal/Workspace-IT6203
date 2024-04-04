import { Routes } from '@angular/router';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { ScheduleRideComponent } from './schedule-ride/schedule-ride.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { ScheduledRidesComponent } from './scheduled-rides/scheduled-rides.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomePageComponent
    }, {
        path: 'registerDriver',  
        component: DriverFormComponent
    }, {
        path: 'scheduleRide',  
        component: ScheduleRideComponent
    }, {
        path: 'listDrivers',  
        component: ListDriversComponent
    }, {
        path: 'updateDriver/:_id',  
        component: DriverFormComponent
    }, {
        path: 'scheduledRides',  
        component: ScheduledRidesComponent
    }, {
        path: 'updateRide/:_id',  
        component: ScheduleRideComponent
    }
];