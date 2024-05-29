import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private API_KEY = "3991fe3bda6e6e974aaa80a57e75da76"
  constructor(private http:HttpClient) { }
  
  public getLocation({city,country}:{city:string|null,country:string}):Observable<any>{
      const API_LOCATION = `http://api.openweathermap.org/geo/1.0/direct?q=${city?city:"Bogota"}&limit=1&appid=3991fe3bda6e6e974aaa80a57e75da76`
      return this.http.get<any>(API_LOCATION)

  }
  public getWeather ({lat,lon}:{lat:number,lon:number}):Observable<any>{
    
    const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3991fe3bda6e6e974aaa80a57e75da76`
    return this.http.get<any>(API_WEATHER)
  }
}
