import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
      
  }
  // onCountryChange(event:any){
  //   const selectedCountry = event.target.value;
  //   this.http.get<string[]>(`http//:hola.com?pais=${selectedCountry}`).subscribe(data=>{
  //     this.ciudades = data;
  //   })
  // }
}
