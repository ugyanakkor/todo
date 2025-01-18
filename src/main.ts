import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.roputes';
import { AppComponent } from './app/app.component';

import 'zone.js';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)],
}).catch(err => console.error(err));
