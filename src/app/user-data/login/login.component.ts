import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {ButtonComponent} from "../../../shared/button/button.component";
import {SvgGeneratorComponent} from "../../generators/svg-generator/svg-generator.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonComponent,
    SvgGeneratorComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: '../user-data.component.scss'
})
export class LoginComponent {

}
