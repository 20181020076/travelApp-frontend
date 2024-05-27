
import { Component, OnInit } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbProgressbar],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  countries: string[] = ["Inglaterra","Japon","India","Dinamarca"];
  cities: string[] = ["Toronto","Roma","Bogota","Paris"];
  formState: number = 0;
  selectedCountry: string =this.countries[0];
  selectedCity: string =this.cities[0];
  selectedCash: number = 0;



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
  validateForm(){
    console.log(this.selectedCountry);
  }
  setSelectedContry(event:Event){
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCountry = selectElement.value;
  }
  setSelectedCity(event:Event){
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCity = selectElement.value;
  }
  setSelectedCash(event:Event){
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCash = parseInt(selectElement.value);
  }
}
