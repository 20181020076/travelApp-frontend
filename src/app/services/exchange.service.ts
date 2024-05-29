import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  constructor(private http:HttpClient) { }
  
  public convert(currencyCode:string):Observable<any>{
    const API_URL=`https://v6.exchangerate-api.com/v6/e93cd8f8488e7f763fc856d6/pair/COP/${currencyCode.toUpperCase()}`
    return this.http.get<any>(API_URL)
  }
  
}
