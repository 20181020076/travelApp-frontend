import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http:HttpClient) { }
  public getCountries(){

    return this.http.get<any>("http://127.0.0.1:8000/api/countries")
  }
}
