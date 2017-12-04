import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {StronaGlownaComponent} from './strona-glowna/strona-glowna.component';
import {RouterModule, Routes} from "@angular/router";
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import {CovalentLayoutModule} from "@covalent/core";
import {EdycjaProfiluUzytkownikaComponent} from './edycja-profilu-uzytkownika/edycja-profilu-uzytkownika.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const appRoutes: Routes = [
  { path: '', redirectTo: 'powitanie', pathMatch: 'full' },
  { path: 'powitanie',
    component: StronaGlownaComponent,
    data: { title: 'Fast Courier' }
  },
  {
    path: 'profil/edytuj',
    component: EdycjaProfiluUzytkownikaComponent,
    data: { title: 'Fast Courier - Personalizowanie profilu użytkownika' }
  },
  { path: '**',
    redirectTo: 'powitanie',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StronaGlownaComponent,
    EdycjaProfiluUzytkownikaComponent
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
    BrowserAnimationsModule,
    CovalentLayoutModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
