import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Logika biznesowa dla oceny transakcji
 */
@Component({
  selector: 'app-ocena-transakcji',
  templateUrl: './ocena-transakcji.component.html',
  styleUrls: ['./ocena-transakcji.component.css']
})
export class OcenaTransakcjiComponent {
  ocenaTransakcji = new FormGroup({
    koment: new FormControl('', [Validators.maxLength(500)])
});

}
