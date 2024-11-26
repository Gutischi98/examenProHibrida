import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
