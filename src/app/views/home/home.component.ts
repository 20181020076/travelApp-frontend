import { Component, OnInit } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ExchangeService } from '../../services/exchange.service';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbProgressbar,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  countries: string[] = [];
  cities: string[] = ['Toronto', 'Roma', 'Bogota', 'Paris'];
  formState: number = 2;
  selectedCountry: string = this.countries[0];
  selectedCity: string = this.cities[0];
  selectedCash: number = 0;
  currencyConverted: number = 0;
  weather:number = 0;
  constructor(
    private ExchangeService: ExchangeService,
    private WeatherService: WeatherService,
    private CountriesService: CountriesService
  ) {}
  ngOnInit(): void {
      this.CountriesService.getCountries().subscribe({
        next: (x) => {
          x.map((c:any)=>{
            return console.log(c)
          })
          
          // this.countries=x.
        },
        error: (er) => console.error(er),
        complete: () => console.info('complete')
      });
  }

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

    // metodo que extrae las coordenadas de una ciudad y luego consluta el clima de esas coordenadas
    this.WeatherService.getLocation({ city: 'hd', country: '' }).subscribe({
      next: (v) => {
        const lat = v[0].lat;
        const lon = v[0].lon;

         this.WeatherService.getWeather({lat,lon}).subscribe({
          next: (x) => {
            console.log(x.main.temp)
            this.weather=x.main.temp
          },
          error: (er) => console.error(er),
          complete: () => console.info('complete'),
        });

        
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });

    // metodo que conviete la moneda de cop a moneda local (descomentar)

    this.ExchangeService.convert().subscribe({
      next: (v) => {
        this.currencyConverted = v.conversion_rate*this.selectedCash;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });

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

  preventFormSubmit(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.validateForm();
    }
  }
}
