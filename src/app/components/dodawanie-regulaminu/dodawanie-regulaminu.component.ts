import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Logika biznesowa dla komponentu dodawania regulaminu
 */
@Component({
  selector: 'app-dodawanie-regulaminu',
  templateUrl: './dodawanie-regulaminu.component.html',
  styleUrls: ['./dodawanie-regulaminu.component.css']
})

/**
 * Klasa odpowiedzialna za walidację danych wprowadzanych, w formularzu dodawania regulaminu
 * @author Adrian Plichta
 * @since 0.0.2
 * @copyright Magical Solutions
 * @license Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
export class DodawanieRegulaminuComponent {
  dodawanieRegulaminuForm = new FormGroup({
    tytul: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    tresc: new FormControl('', [Validators.required, Validators.maxLength(5000)])
  });
}
