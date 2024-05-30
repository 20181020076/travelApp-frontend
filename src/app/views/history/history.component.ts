import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { History } from '../../models/models';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit{
  constructor(private HistoryService: HistoryService){
     
  }
  ngOnInit(): void {
    this.HistoryService.getHistories().subscribe({
      next: async (x) => {
        x.map(r=>{
          const modelR:History = {
            id:r.id,
            weather:r.weather,
            weather_icon:r.weather_icon, 
            currency_cop:r.currency_cop, 
            converted_currency:r.converted_currency,
            country_id:r.country_id, 
            city_id:r.city_id
          }
          
          return this.history.push(modelR)
        })
        
      },
      error: (er) => console.error(er),
      complete: () => console.info('complete')
    });
      
  }
  history : History[] = [];
}
