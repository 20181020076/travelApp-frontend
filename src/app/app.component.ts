import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbdOffcanvasBasic } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgbdOffcanvasBasic,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'travelApp';
  static isDarkTheme = false;

  static handleDarkTheme() {
    AppComponent.isDarkTheme = !AppComponent.isDarkTheme;
    console.log(this.isDarkTheme)
  }
}
