import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { UserDataComponent } from "./user-data/user-data.component";
import { authGuard } from './auth.guard'; // Import the guard
import { LogoutComponent } from './user-data/logout/logout.component';
import {TrainingComponent} from "./training/training.component";

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
    path: 'training/:trainingSection',
    component: TrainingComponent,
    // canActivate: [authGuard], // Protect this route
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard], // Protect this route
  }
];
