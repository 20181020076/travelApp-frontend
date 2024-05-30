import { Component, OnInit } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ExchangeService } from '../../services/exchange.service';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../../services/countries.service';
import { City, Country, History, Weather } from '../../models/models';
import { HistoryService } from '../../services/history.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbProgressbar, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  countries: Country[] = [];
  cities: City[] = [];
  formState: number = 0;
  selectedCountry: Country | null = null;
  selectedCity: City | null = null;
  selectedCash: number | null = null;
  currencyConverted: number = 0;
  weather: Weather | null = null;
  constructor(
    private ExchangeService: ExchangeService,
    private WeatherService: WeatherService,
    private CountriesService: CountriesService,
    private HistoryService: HistoryService
  ) {}
  ngOnInit(): void {
    this.CountriesService.getCountries().subscribe({
      next: async (x) => {
        this.countries = x;
        this.selectedCountry = this.countries[0];
        this.cities = this.getCitiesByCountry(this.selectedCountry.id);
        this.selectedCity = this.cities[0];
      },
      error: (er) => console.error(er),
      complete: () => console.info('complete'),
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
    if (!this.selectedCity) {
    } else {
      this.WeatherService.getLocation({
        city: this.selectedCity.name,
        country: '',
      }).subscribe({
        next: (v) => {
          const lat = v[0].lat;
          const lon = v[0].lon;

          this.WeatherService.getWeather({ lat, lon }).subscribe({
            next: (x) => {
              console.log(x.weather[0].icon);
              if (x) {
                this.weather = {
                  id: x.id,
                  temp: Math.round(x.main.temp - 273.15),
                  icon: x.weather[0].icon,
                };
              }
            },
            error: (er) => console.error(er),
            complete: () => console.info('complete'),
          });
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
    }

    // metodo que conviete la moneda de cop a moneda local (descomentar)
    if (!this.selectedCountry) {
    } else {
      this.ExchangeService.convert(
        this.selectedCountry.currency_code
      ).subscribe({
        next: async (v) => {
          if (this.selectedCash) {
            this.currencyConverted = v.conversion_rate * this.selectedCash;
          }
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
    }
    if (
      !(
        this.weather?.temp &&
        this.selectedCash &&
        this.currencyConverted &&
        this.selectedCountry?.id &&
        this.selectedCity?.id
      )
    ) {
      console.error('Uno o más campos no están definidos.');
      console.error(
        this.weather,
        this.selectedCash,
        this.currencyConverted,
        this.selectedCountry,
        this.selectedCity
      );
    } else {
      const objectData: History = {
        weather: this.weather.temp,
        weather_icon: this.weather.icon,
        currency_cop: this.selectedCash,
        converted_currency: this.currencyConverted,
        country_id: this.selectedCountry.id,
        city_id: this.selectedCity.id,
      };
      this.HistoryService.postHistory(objectData);
    }
  }
  clearForm() {
    window.location.reload();
  }
  setSelectedContry(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    console.log('\n Country selected: \n', selectElement.value);
    const country = this.countries.find(
      (c: any) => c.id == selectElement.value
    );
    if (!country) {
      console.error('Country not found.');
      return;
    }

    this.selectedCountry = country;
    this.cities = this.getCitiesByCountry(this.selectedCountry.id);
    this.selectedCity = this.cities[0];
    console.log('\n cities:\n', this.cities);
  }

  getCountryNamebyId(id: Number) {
    const validation = this.countries.find((country: any) => country.id === id);
    return validation?.name;
  }
  setSelectedCity(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const cityId = parseInt(selectElement.value);
    this.selectedCity = this.cities.find((c) => c.id === cityId) ?? null;
  }
  setSelectedCash(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    console.log(1, event);
    if (selectElement.value) {
      this.selectedCash = Math.round(parseInt(selectElement.value));
    }
  }

  preventFormSubmit(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();

      this.validateForm();
    }
  }

  getCitiesByCountry(countryId: number): City[] {
    return (
      this.countries.find((country: any) => country.id === countryId)?.cities ??
      []
    );
  }
  capitalize(str: string | undefined) {
    if (typeof str !== 'string' || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
