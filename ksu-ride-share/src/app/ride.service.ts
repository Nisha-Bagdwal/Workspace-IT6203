import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RideService {

    constructor(private http: HttpClient) { }

    searchAvailableRides(ride: any) {
        return this.http.post('http://localhost:8000/searchAvailableRides', ride);
    }

    bookRide(scheduledRide: any) {
        return this.http.post('http://localhost:8000/bookRide', scheduledRide);
    }

    getScheduledRides(){
        return this.http.get('http://localhost:8000/getScheduledRides/');
    }

    deleteRide(rideId: string) {
        return this.http.delete("http://localhost:8000/ride/" + rideId);
    }

    updateRide(rideId: string, scheduledRide: any) {
        return this.http.put("http://localhost:8000/ride/" + rideId, scheduledRide);
    }

    getRide(rideId: string) {
        return this.http.get('http://localhost:8000/ride/' + rideId);
    }

}
