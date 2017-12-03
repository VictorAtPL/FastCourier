import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {StronaGlownaComponent} from './strona-glowna/strona-glowna.component';
import {RouterModule, Routes} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {CovalentLayoutModule} from '@covalent/core';
import {PisanieWiadomosciComponent} from './pisanie-wiadomosci/pisanie-wiadomosci.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ZglaszanieUzytkownikaComponent} from './zglaszanie-uzytkownika/zglaszanie-uzytkownika.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'powitanie', pathMatch: 'full' },
  { path: 'powitanie',
    component: StronaGlownaComponent,
    data: { title: 'Fast Courier' }
  },
  {
    path: 'wiadomosc/wyslij',
    component: PisanieWiadomosciComponent,
    data: { title: 'Fast Courier - Pisanie wiadomości do użytkownika' }
  },
  {
    path: 'uzytkownik/zglos',
    component: ZglaszanieUzytkownikaComponent,
    data: { title: 'Fast Courier - Zgłaszanie użytkownika' }
  },
  { path: '**',
    redirectTo: 'powitanie',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StronaGlownaComponent,
    PisanieWiadomosciComponent,
    ZglaszanieUzytkownikaComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CovalentLayoutModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
