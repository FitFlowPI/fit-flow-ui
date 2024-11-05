import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { UserDataComponent } from "./user-data/user-data.component";
import { GymChartSelectComponent } from "./chart-managing/gym-chart-select/gym-chart-select.component";
import { authGuard } from './auth.guard'; // Import the guard
import { LogoutComponent } from './user-data/logout/logout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/login',
    pathMatch: 'full'
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'user/:actionType',
    component: UserDataComponent,
  },
  {
    path: 'chart/:chartSection',
    component: GymChartSelectComponent,
    canActivate: [authGuard], // Protect this route
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard], // Protect this route
  }
];
