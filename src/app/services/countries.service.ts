import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }
  public getCountries() {

    return this.http.get<Country[]>("http://127.0.0.1:8000/api/countries")
  }
}
