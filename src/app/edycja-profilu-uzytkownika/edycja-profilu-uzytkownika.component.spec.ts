import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EdycjaProfiluUzytkownikaComponent} from './edycja-profilu-uzytkownika.component';

describe('EdycjaProfiluUzytkownikaComponent', () => {
  let component: EdycjaProfiluUzytkownikaComponent;
  let fixture: ComponentFixture<EdycjaProfiluUzytkownikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdycjaProfiluUzytkownikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdycjaProfiluUzytkownikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
