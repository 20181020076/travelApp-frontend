import { Component } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ExchangeService } from '../../services/exchange.service';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbProgressbar,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  countries: string[] = ['Inglaterra', 'Japon', 'India', 'Dinamarca'];
  cities: string[] = ['Toronto', 'Roma', 'Bogota', 'Paris'];
  formState: number = 0;
  selectedCountry: string = this.countries[0];
  selectedCity: string = this.cities[0];
  selectedCash: number = 0;
  currencyConverted: number = 0;
  constructor(
    private ExchangeService: ExchangeService,
    private WeatherService: WeatherService
  ) {}

  nextForm() {
    if (this.formState < 2) {
      this.formState++;
    } else {
      this.formState = 0;
    }
  }
  previusForm() {
    if (this.formState > 0) {
      this.formState--;
    } else {
      this.formState = 2;
    }
  }
  validateForm() {
    this.formState++;

    // metodo que extrae las coordenadas de una ciudad
    this.WeatherService.getLocation({ city: 'hd', country: '' }).subscribe({
      next: async (v) => {
        const lat = v[0].lat;
        const lon = v[0].lon;

         this.WeatherService.getWeather({lat,lon}).subscribe({
          next: async (x) => {
            console.log(x)
          },
          error: (er) => console.error(er),
          complete: () => console.info('complete'),
        });

        
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });

    // metodo que conviete la moneda de cop a moneda local (descomentar)

    // this.ExchangeService.convert().subscribe({
    //   next: (v) => {
    //     this.currencyConverted = v.conversion_rate*this.selectedCash;
    //   },
    //   error: (e) => console.error(e),
    //   complete: () => console.info('complete'),
    // });

    const objectData = {
      country: this.selectedCountry,
      city: this.selectedCity,
      cash: this.selectedCash,
      cashConverted: this.currencyConverted,
    };

    console.log(objectData);
  }
  clearForm() {
    window.location.reload();
  }
  setSelectedContry(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCountry = selectElement.value;
  }
  setSelectedCity(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCity = selectElement.value;
  }
  setSelectedCash(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCash = parseInt(selectElement.value);
  }
}
