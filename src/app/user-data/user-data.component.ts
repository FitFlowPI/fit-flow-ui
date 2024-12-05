import {
  Component,
} from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {SvgGeneratorComponent} from "../shared/svg-generator/svg-generator.component";
import {NgClass, NgIf} from "@angular/common";
import {RegisterComponent} from "./register/register.component";
import {PasswordRecoveryComponent} from "./password-recovery/password-recovery.component";
import {UpdatePasswordComponent} from "./update-password/update-password.component";
import {GenderSelectComponent} from "./user-details/gender-select/gender-select.component";
import {PageSliderComponent} from "../shared/page-slider/page-slider.component";
import {PerformanceComponent} from "./performance/performance.component";

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [
    LoginComponent,
    SvgGeneratorComponent,
    NgIf,
    RegisterComponent,
    NgClass,
    PasswordRecoveryComponent,
    UpdatePasswordComponent,
    GenderSelectComponent,
    PageSliderComponent,
    PerformanceComponent
  ],
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss', '../shared/page-slider/slider-children.css'],
})
export class UserDataComponent {



}
