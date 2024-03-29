import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DriverService {

    constructor(private http: HttpClient) { }

    addDriver(driver: any) {
        this.http.post('http://localhost:8000/registerDriver', driver)
            .subscribe((responseData) => {
                console.log("Registered: "+ responseData);
            });
    }

    getDrivers() {
        return this.http.get('http://localhost:8000/listDrivers/');
    }

    getDriver(driverId: string) {
        return this.http.get('http://localhost:8000/driver/' + driverId);
    }

    deleteDriver(driverId: string) {
        this.http.delete("http://localhost:8000/driver/" + driverId)
            .subscribe(() => {
                console.log('Deleted: ' + driverId);
            });
        location.reload();
    }

    updateDriver(driverId: string, driver: any) {
        return this.http.put("http://localhost:8000/driver/" + driverId, driver)
            .subscribe((responseData) => {
                console.log("Updated: " + responseData);
            });
    }
}
