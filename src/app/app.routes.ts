import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { RecordComponent } from './views/record/record.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"historial",component:RecordComponent},

];
