import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { History } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) {
    
   }
  public getHistories() {
    return this.http.get<History[]>("http://127.0.0.1:8000/api/histories?limit=5")
  }
  public postHistory(History:History){
    
    return this.http.post<History[]>("http://127.0.0.1:8000/api/histories?limit=5",History)
  }
}
