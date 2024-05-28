import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private API_URL="https://v6.exchangerate-api.com/v6/e93cd8f8488e7f763fc856d6/pair/COP/EUR"
  constructor(private http:HttpClient) { }
  
  public convert():Observable<any>{
    return this.http.get<any>(this.API_URL)
  }
  
}
