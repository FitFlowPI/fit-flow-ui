import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { UserDataComponent } from "./user-data/user-data.component";
import { authGuard } from './auth.guard'; // Import the guard
import { LogoutComponent } from './user-data/logout/logout.component';
import { TrainingComponent } from "./training/training.component";
import { TrainingDayCreateComponent } from './training/training-day-create/training-day-create.component';
import { UpdatePasswordComponent } from './user-data/update-password/update-password.component'; // Import the update password component
import { TrainingDayExerciseSelectComponent } from './training/training-day-exercise-select/training-day-exercise-select.component';
import { ExerciseStartComponent } from './training/exercise-start/exercise-start.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/login',
    pathMatch: 'full'
  },
  {
    path: 'logout',
    component: LogoutComponent,
    // canActivate: [authGuard], // Protect this route
  },
  {
    path: 'user/:actionType',
    component: UserDataComponent,
  },
  {
    path: 'training/:trainingSection',
    component: TrainingComponent,
    // canActivate: [authGuard], // Protect this route
  },
  {
    path: 'training/exercise-select/:trainingDayId',
    component: TrainingDayExerciseSelectComponent,
    // canActivate: [authGuard], // Protect this route
  },
  {
    path: 'training/training-day-create/:trainingDayId',  // Handle edit case with trainingDayId
    component: TrainingDayCreateComponent,
    canActivate: [authGuard],  // Protect this route
  },
  {
    path: 'training/training-day-create',  // Handle create case without trainingDayId
    component: TrainingDayCreateComponent,
    canActivate: [authGuard],  // Protect this route
  },
  { path: 'training/exercise-start', 
    component: ExerciseStartComponent,
    canActivate: [authGuard], 
  },
  { path: 'training/exercise-start/:trainingDayId/:exerciseId', 
    component: ExerciseStartComponent,
    canActivate: [authGuard], 
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard], // Protect this route
  },
  {
    path: 'user/update-password',
    component: UpdatePasswordComponent, // New route for password update
    canActivate: [authGuard], // Protect this route
  },
  {
    path: '**', // Wildcard route
    redirectTo: 'user/login', // Redirects to login
    pathMatch: 'full',
  },
];
