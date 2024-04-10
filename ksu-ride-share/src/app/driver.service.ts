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
        return this.http.post('http://localhost:8000/registerDriver', driver);
    }

    getDrivers() {
        return this.http.get('http://localhost:8000/listDrivers/');
    }

    getDriver(driverId: string) {
        return this.http.get('http://localhost:8000/driver/' + driverId);
    }

    deleteDriver(driverId: string) {
        return this.http.delete("http://localhost:8000/driver/" + driverId);
    }

    updateDriver(driverId: string, driver: any) {
        return this.http.put("http://localhost:8000/driver/" + driverId, driver);
    }
}
