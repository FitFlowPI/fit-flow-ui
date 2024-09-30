import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {ButtonComponent} from "../../button/button.component";
import {SvgGeneratorComponent} from "../../generators/svg-generator/svg-generator.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonComponent,
    SvgGeneratorComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: '../auth-pages.component.scss'
})
export class LoginComponent {

}
