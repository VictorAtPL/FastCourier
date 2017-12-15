import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ZglaszanieUzytkownikaComponent} from './zglaszanie-uzytkownika.component';

describe('ZglaszanieUzytkownikaComponent', () => {
  let component: ZglaszanieUzytkownikaComponent;
  let fixture: ComponentFixture<ZglaszanieUzytkownikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZglaszanieUzytkownikaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZglaszanieUzytkownikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
