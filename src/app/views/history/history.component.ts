import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  history = [
    {
      id:1,
      country_id: 1,
      weather: 280,
      city_id: 1,
      currency_cop: 500,
      currency_converted: 500,
      weather_icon: 'dfx',
    },
    {
      id:2,
      country_id: 2,
      weather: 230,
      city_id: 1,
      currency_cop: 200,
      currency_converted: 200,
      weather_icon: 'dfx',
    },
    {
      id:3,
      country_id: 3,
      weather: 280,
      city_id: 1,
      currency_cop: 500,
      currency_converted: 500,
      weather_icon: 'dfx',
    },
    {
      id:4,
      country_id: 4,
      weather: 280,
      city_id: 1,
      currency_cop: 500,
      currency_converted: 500,
      weather_icon: 'dfx',
    },
    {
      id:5,
      country_id: 5,
      weather: 280,
      city_id: 1,
      currency_cop: 500,
      currency_converted: 500,
      weather_icon: 'dfx',
    },
  ];
}
