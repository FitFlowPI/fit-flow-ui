import { Component } from '@angular/core';
import {ButtonComponent} from "../../button/button.component";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    InputTextModule,
    PasswordModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: '../user-data.component.scss'
})
export class RegisterComponent {

}
