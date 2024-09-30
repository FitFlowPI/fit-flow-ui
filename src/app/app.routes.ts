import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthPagesComponent} from "./auth-pages/auth-pages.component";

export const routes: Routes = [
  {
    path: 'auth/:authType',
    component: AuthPagesComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  }
];
