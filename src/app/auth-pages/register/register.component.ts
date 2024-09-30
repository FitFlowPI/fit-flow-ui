import { Component } from '@angular/core';
import {ButtonComponent} from "../../button/button.component";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    InputTextModule,
    PasswordModule
  ],
  templateUrl: './register.component.html',
  styleUrl: '../auth-pages.component.scss'
})
export class RegisterComponent {

}
