import { Component } from '@angular/core';
import {ButtonComponent} from "../../../shared/button/button.component";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {RouterLink} from "@angular/router";
import {PasswordModule} from "primeng/password";

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    InputTextModule,
    PaginatorModule,
    RouterLink,
    PasswordModule
  ],
  templateUrl: './update-password.component.html',
  styleUrl: '../user-data.component.scss'
})
export class UpdatePasswordComponent {

}
