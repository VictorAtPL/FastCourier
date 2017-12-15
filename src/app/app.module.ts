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
import {EdytowaniaZapoznaniaComponent} from './components/edytowania-zapoznania/edytowania-zapoznania.component';
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
import {KeysPipe} from "./pipes/keys.pipe";
import {CapitalizePipe} from "./pipes/capitalize.pipe";
import {PrzejrzyjZgloszeniaUzytkownikowComponent} from './components/przejrzyj-zgloszenia-uzytkownikow/przejrzyj-zgloszenia-uzytkownikow.component';

/**
 * Tablica określająca jakiemu url-owi odpowiada który komponent aplikacji
 * @type {[{path: string; component: LogowanieComponent; data: {title: string}} , {path: string; redirectTo: string; pathMatch: string} , {path: string; component: StronaGlownaComponent; data: {title: string}} , {path: string; component: OcenaTransakcjiComponent; data: {title: string}} , {path: string; component: DodawanieRegulaminuComponent; data: {title: string}} , {path: string; component: EdycjaProfiluUzytkownikaComponent; data: {title: string}} , {path: string; component: ZglaszanieUwagiComponent; data: {title: string}} , {path: string; component: ZglaszanieOfertyComponent; data: {title: string}} , {path: string; component: DodawanieOfertyComponent; data: {title: string}} , {path: string; component: EdytowanieOfertyComponent; data: {title: string}} , {path: string; component: SzukanieZaawansowaneComponent; data: {title: string}} , {path: string; component: RejestracjaComponent; data: {title: string}} , {path: string; component: PisanieWiadomosciComponent; data: {title: string}} , {path: string; component: ZglaszanieUzytkownikaComponent; data: {title: string}} , {path: string; component: ZglaszanieTransakcjiComponent; data: {title: string}} , {path: string; component: EdytowaniaZapoznaniaComponent; data: {title: string}} , {path: string; component: PanelUzytkownikaComponent; data: {title: string}} , {path: string; component: PanelAdministratoraComponent; data: {title: string}} , {path: string; redirectTo: string}]}
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
    path: 'oferta/dodaj',
    component: DodawanieOfertyComponent,
    data: {title: 'Fast Courier - Dodawanie oferty'}
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
    path: 'transakcja/zglos',
    component: ZglaszanieTransakcjiComponent,
    data: {title: 'Fast Courier - Zgłaszanie transakcji'}
  },
  {
    path: 'administrator/edytuj_opis',
    component: EdytowaniaZapoznaniaComponent,
    data: {title: 'Fast Courier - Edytuj zapoznanie się z serwisem'}
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
    path: 'uzytkownik/profil/:login',
    component: PrzejrzyjProfilComponent,
    data: {title: 'Fast Courier - Profil użytkownika'}
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
    EdytowaniaZapoznaniaComponent,
    PanelAdministratoraComponent,
    PanelUzytkownikaComponent,
    EdytowanieOfertyComponent,
    PrzejrzyjProfilComponent,
    KeysPipe,
    CapitalizePipe,
    PrzejrzyjZgloszeniaUzytkownikowComponent
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
