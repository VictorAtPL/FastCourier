import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Logika biznesowa dla pisania wiadomości
 */
@Component({
  selector: 'app-pisanie-wiadomosci',
  templateUrl: './pisanie-wiadomosci.component.html',
  styleUrls: ['./pisanie-wiadomosci.component.css']
})
export class PisanieWiadomosciComponent implements OnInit, OnDestroy {

  napiszWiadomoscForm: FormGroup;

  ngOnInit(): void {
    this.napiszWiadomoscForm = new FormGroup({
      'tresc': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)])
    });
  }

  ngOnDestroy(): void {
  }

  wyslij() {
    const data = {
      tresc: this.napiszWiadomoscForm.controls['tresc'].value
    };
  }
}
