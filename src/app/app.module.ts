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
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import {CovalentLayoutModule} from "@covalent/core";
import {EdytowaniaZapoznaniaComponent} from './edytowania-zapoznania/edytowania-zapoznania.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const appRoutes: Routes = [
  { path: '', redirectTo: 'powitanie', pathMatch: 'full' },
  { path: 'powitanie',
    component: StronaGlownaComponent,
    data: { title: 'Fast Courier' }
  },
  {
    path: 'zapoznaj_sie_z_serwisem/edytuj',
    component: EdytowaniaZapoznaniaComponent,
    data: { title: 'Fast Courier - Edytuj zapoznanie się z serwisem' }
  },
  { path: '**',
    redirectTo: 'powitanie',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StronaGlownaComponent,
    EdytowaniaZapoznaniaComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    CovalentLayoutModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
