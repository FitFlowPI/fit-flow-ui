import { Component } from '@angular/core';
import {ButtonComponent} from "../../../shared/button/button.component";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    InputTextModule,
    PasswordModule,
    RouterLink
  ],
  templateUrl: './password-recovery.component.html',
  styleUrl: '../user-data.component.scss'
})
export class PasswordRecoveryComponent {

}
