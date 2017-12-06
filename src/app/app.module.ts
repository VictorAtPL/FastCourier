import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {StronaGlownaComponent} from './strona-glowna/strona-glowna.component';
import {RouterModule, Routes} from '@angular/router';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentDialogsModule,
  CovalentExpansionPanelModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentMediaModule,
  CovalentMenuModule,
  CovalentMessageModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule
} from '@covalent/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {DodawanieOfertyComponent} from './dodawanie-oferty/dodawanie-oferty.component';
import {SzukanieZaawansowaneComponent} from './szukanie-zaawansowane/szukanie-zaawansowane.component';
import {LogowanieComponent} from './logowanie/logowanie.component';
import {RejestracjaComponent} from './rejestracja/rejestracja.component';
import {PisanieWiadomosciComponent} from './pisanie-wiadomosci/pisanie-wiadomosci.component';
import {ZglaszanieUzytkownikaComponent} from './zglaszanie-uzytkownika/zglaszanie-uzytkownika.component';
import {ZglaszanieOfertyComponent} from './zglaszanie-oferty/zglaszanie-oferty.component';

const appRoutes: Routes = [
  {
    path: 'logowanie',
    component: LogowanieComponent,
    data: {title: 'Fast Courier - Logowanie'}
  },
  { path: '', redirectTo: 'powitanie', pathMatch: 'full' },
  { path: 'powitanie',
    component: StronaGlownaComponent,
    data: { title: 'Fast Courier' }
  },
  {
    path: 'oferta/zglos',
    component: ZglaszanieOfertyComponent,
    data: {title: 'Fast Courier - Zgłaszanie oferty'}
  },
  {
    path: 'oferta/dodaj',
    component: DodawanieOfertyComponent,
    data: {title: 'Fast Courier - Dodawanie oferty'}
  },
  {
    path: 'oferta/wyszukiwanie',
    component: SzukanieZaawansowaneComponent,
    data: {title: 'Fast Courier - Wyszukiwanie zaawnswoane'}
  },
  {
    path: 'rejestracja',
    component: RejestracjaComponent,
    data: {title: 'Fast Courier - Rejestracja'}
  },
  {
    path: 'wiadomosc/wyslij',
    component: PisanieWiadomosciComponent,
    data: {title: 'Fast Courier - Pisanie wiadomości do użytkownika'}
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
    DodawanieOfertyComponent,
    SzukanieZaawansowaneComponent,
    LogowanieComponent,
    RejestracjaComponent,
    PisanieWiadomosciComponent,
    ZglaszanieUzytkownikaComponent,
    ZglaszanieOfertyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    /** Material Modules */
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatTooltipModule,
    MatRippleModule,
    MatRadioModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatAutocompleteModule,
    /** Covalent Modules */
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
