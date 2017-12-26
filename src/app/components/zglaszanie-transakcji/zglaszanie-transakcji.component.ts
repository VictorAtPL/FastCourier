import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Logika biznesowa dla komponentu zgłaszania transakcji
 */
@Component({
  selector: 'app-zglaszanie-transakcji',
  templateUrl: './zglaszanie-transakcji.component.html',
  styleUrls: ['./zglaszanie-transakcji.component.css']
})
export class ZglaszanieTransakcjiComponent implements OnInit, OnDestroy {
  selected: String;

  zglosTransakcjeForm: FormGroup;

  public powody: any[] = [{value: 'Niezastosowanie się do warunków transakcji przez Kierowcę'},
    {value: 'Niezastosowanie się do warunków transakcji przez Nadawcę'},
    {value: 'Inne'}];
  private sub: any;

  ngOnInit(): void {
    this.zglosTransakcjeForm = new FormGroup({
      'powod': new FormControl('', [Validators.required]),
      'tresc': new FormControl('', [Validators.required, Validators.minLength(40), Validators.maxLength(500)])
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  zglos() { // dodałem tylko szkielet. Walidacja zrobiona, ale brak logiki ~Marcinexxx.
    const data = {
      powod: this.zglosTransakcjeForm.controls['powod'].value.value,
      tresc: this.zglosTransakcjeForm.controls['tresc'].value
    };
  }
}
