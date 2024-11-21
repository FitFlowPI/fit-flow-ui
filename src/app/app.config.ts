import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { ToastModule } from 'primeng/toast';  // Import ToastModule
import { MessageService } from 'primeng/api'; // Import MessageService

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(), // Add global animations support
    MessageService // Provide MessageService globally
  ]
};