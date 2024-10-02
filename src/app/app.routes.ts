import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserDataComponent} from "./user-data/user-data.component";

export const routes: Routes = [
  {
    path: 'auth/:actionType',
    component: UserDataComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  }
];
