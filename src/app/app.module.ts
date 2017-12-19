import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {StronaGlownaComponent} from './components/strona-glowna/strona-glowna.component';
import {RouterModule, Routes} from '@angular/router';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
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
  MatTableModule,
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DodawanieOfertyComponent} from './components/dodawanie-oferty/dodawanie-oferty.component';
import {SzukanieZaawansowaneComponent} from './components/szukanie-zaawansowane/szukanie-zaawansowane.component';
import {LogowanieComponent} from './components/logowanie/logowanie.component';
import {RejestracjaComponent} from './components/rejestracja/rejestracja.component';
import {PisanieWiadomosciComponent} from './components/pisanie-wiadomosci/pisanie-wiadomosci.component';
import {ZglaszanieUzytkownikaComponent} from './components/zglaszanie-uzytkownika/zglaszanie-uzytkownika.component';
import {ZglaszanieOfertyComponent} from './components/zglaszanie-oferty/zglaszanie-oferty.component';
import {ZglaszanieTransakcjiComponent} from './components/zglaszanie-transakcji/zglaszanie-transakcji.component';
import {ZglaszanieUwagiComponent} from './components/zglaszanie-uwagi/zglaszanie-uwagi.component';
import {EdycjaProfiluUzytkownikaComponent} from './components/edycja-profilu-uzytkownika/edycja-profilu-uzytkownika.component';
import {DodawanieRegulaminuComponent} from './components/dodawanie-regulaminu/dodawanie-regulaminu.component';
import {OcenaTransakcjiComponent} from './components/ocena-transakcji/ocena-transakcji.component';
import {PanelAdministratoraComponent} from './components/panel-administratora/panel-administratora.component';
import {PanelUzytkownikaComponent} from './components/panel-uzytkownika/panel-uzytkownika.component';
import {EdytowanieOfertyComponent} from './components/edytowanie-oferty/edytowanie-oferty.component';
import {DatePipe} from '@angular/common';
import {CustomFormsModule} from 'ng2-validation';
import {AutentykacjaService} from './services/autentykacja.service';
import {PrzejrzyjProfilComponent} from './components/przejrzyj-profil/przejrzyj-profil.component';
import {KeysPipe} from './pipes/keys.pipe';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {PrzejrzyjZgloszeniaUzytkownikowComponent} from './components/przejrzyj-zgloszenia-uzytkownikow/przejrzyj-zgloszenia-uzytkownikow.component';
import {PrzejrzyjOferteComponent} from './components/przejrzyj-oferte/przejrzyj-oferte.component';
import {PrzejrzyjUwagiComponent} from './components/przejrzyj-uwagi/przejrzyj-uwagi.component';
import {PrzejrzyjZgloszeniaOfertComponent} from './components/przejrzyj-zgloszenia-ofert/przejrzyj-zgloszenia-ofert.component';
import {PrzejrzyjDostepneOfertyComponent} from './components/przejrzyj-dostepne-oferty/przejrzyj-dostepne-oferty.component';
import {ZapoznajSieZSerwisemComponent} from './components/zapoznaj-sie-z-serwisem/zapoznaj-sie-z-serwisem.component';

/**
 * Tablica określająca jakiemu url-owi odpowiada który komponent aplikacji
 */
const appRoutes: Routes = [
  {
    path: 'logowanie',
    component: LogowanieComponent,
    data: {title: 'Fast Courier - Logowanie'}
  },
  {path: '', redirectTo: 'powitanie', pathMatch: 'full'},
  {
    path: 'powitanie',
    component: StronaGlownaComponent,
    data: {title: 'Fast Courier'}
  },
  {
    path: 'transakcja/ocen',
    component: OcenaTransakcjiComponent,
    data: {title: 'Fast Courier'}
  },
  {
    path: 'regulamin/dodaj',
    component: DodawanieRegulaminuComponent,
    data: {title: 'Fast Courier'}
  },
  {
    path: 'uzytkownik/edytuj_profil',
    component: EdycjaProfiluUzytkownikaComponent,
    data: {title: 'Fast Courier - Personalizowanie profilu użytkownika'}
  },
  {
    path: 'uwaga/zglos',
    component: ZglaszanieUwagiComponent,
    data: {title: 'Fast Courier - Zgłaszanie uwagi'}
  },
  {
    path: 'oferta/zglos',
    component: ZglaszanieOfertyComponent,
    data: {title: 'Fast Courier - Zgłaszanie oferty'}
  },
  {
    path: 'oferta/wystaw',
    component: DodawanieOfertyComponent,
    data: {title: 'Fast Courier - Wystawianie oferty'}
  },
  {
    path: 'oferta/edytuj',
    component: EdytowanieOfertyComponent,
    data: {title: 'Fast Courier - Edytowanie oferty'}
  },
  {
    path: 'oferta/wyszukiwanie',
    component: SzukanieZaawansowaneComponent,
    data: {title: 'Fast Courier - Wyszukiwanie zaawnswoane'}
  },
  {
    path: 'oferta/wyswietl/:id',
    component: PrzejrzyjOferteComponent,
    data: {title: 'Fast Courier - Przejrzyj szczegóły oferty'}
  },
  {
    path: 'oferta/lista',
    component: PrzejrzyjDostepneOfertyComponent,
    data: {title: 'Fast Courier - Przejrzyj dostępne oferty'}
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
    path: 'uzytkownik/zglos/:login',
    component: ZglaszanieUzytkownikaComponent,
    data: {title: 'Fast Courier - Zgłaszanie użytkownika'}
  },
  {
    path: 'oferta/zglos/:id',
    component: ZglaszanieOfertyComponent,
    data: {title: 'Fast Courier - Zgłaszanie ofert'}
  },
  {
    path: 'transakcja/zglos',
    component: ZglaszanieTransakcjiComponent,
    data: {title: 'Fast Courier - Zgłaszanie transakcji'}
  },
  {
    path: 'uzytkownik/panel',
    component: PanelUzytkownikaComponent,
    data: {title: 'Fast Courier - Panel użytkownika'}
  },
  {
    path: 'administrator/panel',
    component: PanelAdministratoraComponent,
    data: {title: 'Fast Courier - Panel administratora'}
  },
  {
    path: 'administrator/zgloszeniauzytkownikow',
    component: PrzejrzyjZgloszeniaUzytkownikowComponent,
    data: {title: 'Fast Courier - Zgłoszenia użytkowników'}
  },
  {
    path: 'administrator/zgloszeniaofert',
    component: PrzejrzyjZgloszeniaOfertComponent,
    data: {title: 'Fast Courier - Zgłoszenia ofert'}
  },
  {
    path: 'administrator/uwagi',
    component: PrzejrzyjUwagiComponent,
    data: {title: 'Fast Courier - Uwagi'}
  },
  {
    path: 'uzytkownik/profil/:login',
    component: PrzejrzyjProfilComponent,
    data: {title: 'Fast Courier - Profil użytkownika'}
  },
  {
    path: 'serwis/informacje',
    component: ZapoznajSieZSerwisemComponent,
    data: {title: 'Fast Courier - Zapoznaj się z serwisem'}
  },
  {
    path: '**',
    redirectTo: 'powitanie',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    OcenaTransakcjiComponent,
    DodawanieRegulaminuComponent,
    StronaGlownaComponent,
    EdycjaProfiluUzytkownikaComponent,
    ZglaszanieUwagiComponent,
    DodawanieOfertyComponent,
    SzukanieZaawansowaneComponent,
    LogowanieComponent,
    RejestracjaComponent,
    PisanieWiadomosciComponent,
    ZglaszanieUzytkownikaComponent,
    ZglaszanieOfertyComponent,
    ZglaszanieTransakcjiComponent,
    PanelAdministratoraComponent,
    PanelUzytkownikaComponent,
    EdytowanieOfertyComponent,
    PrzejrzyjProfilComponent,
    KeysPipe,
    CapitalizePipe,
    PrzejrzyjZgloszeniaUzytkownikowComponent,
    PrzejrzyjZgloszeniaOfertComponent,
    PrzejrzyjOferteComponent,
    PrzejrzyjUwagiComponent,
    PrzejrzyjDostepneOfertyComponent,
    ZapoznajSieZSerwisemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
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
    MatTableModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatExpansionModule,
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
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    DatePipe,
    AutentykacjaService
  ],
  bootstrap: [AppComponent]
})

/**
 * Główny moduł aplikacji w którym konfigurowane dołączane są zależności
 */
export class AppModule {
}
