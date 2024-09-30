import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {SvgGeneratorComponent} from "../generators/svg-generator/svg-generator.component";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {RegisterComponent} from "./register/register.component";

@Component({
  selector: 'app-auth-pages',
  standalone: true,
  imports: [
    LoginComponent,
    SvgGeneratorComponent,
    NgIf,
    RegisterComponent
  ],
  templateUrl: './auth-pages.component.html',
  styleUrl: './auth-pages.component.scss'
})
export class AuthPagesComponent implements OnInit{
  // background wave svg properties
  waveHeight: number = 200;
  width: string = "200%";
  height: string = "25%";
  count: number = 20;
  thickness: number = 4;
  blur: number = 15;
  speed: number = 5;
  opacity: number = 0.5;
  displacement: 'fasterTop' | 'fasterBottom' | 'fixed' = 'fasterTop';

  authType: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.authType = params['authType'];  // Obtemos o valor do parâmetro
    });
  }
}
