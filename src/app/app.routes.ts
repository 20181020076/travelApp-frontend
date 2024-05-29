import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { HistoryComponent } from './views/history/history.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"historial",component:HistoryComponent},

];
