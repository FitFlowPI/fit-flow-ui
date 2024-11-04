import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserDataComponent} from "./user-data/user-data.component";
import {GymChartSelectComponent} from "./chart-managing/gym-chart-select/gym-chart-select.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/login',
    pathMatch: 'full'
  },
  {
    path: 'user/:actionType',
    component: UserDataComponent,
  },
  {
    path: 'chart/:chartSection',
    component: GymChartSelectComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  }
];
