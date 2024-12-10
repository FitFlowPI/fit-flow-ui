import { Component } from '@angular/core';
import {ButtonComponent} from "../../../shared/button/button.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faVenus} from "@fortawesome/free-solid-svg-icons/faVenus";
import {faMars} from "@fortawesome/free-solid-svg-icons/faMars";

@Component({
  selector: 'app-gender-select',
  standalone: true,
  imports: [
    ButtonComponent,
    FontAwesomeModule
  ],
  templateUrl: './gender-select.component.html',
  styleUrls: ['../../user-data.component.scss', 'gender-select.component.scss']
})
export class GenderSelectComponent {
  faMars = faMars;
  faVenus = faVenus;

  public selected?: 'male' | 'female';



}
