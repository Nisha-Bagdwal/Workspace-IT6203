import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DriverService {

    constructor(private http: HttpClient) { }

    //Uses http.post() to post data 
    addDriver(driver : any) {
        this.http.post('http://localhost:8000/registerDriver', driver)
            .subscribe((responseData) => {
                console.log(responseData);
            });
            location.reload();
    }
}
