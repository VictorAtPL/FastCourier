import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrzejrzyjZgloszeniaUzytkownikowComponent} from './przejrzyj-zgloszenia-uzytkownikow.component';

describe('PrzejrzyjZgloszeniaUzytkownikowComponent', () => {
  let component: PrzejrzyjZgloszeniaUzytkownikowComponent;
  let fixture: ComponentFixture<PrzejrzyjZgloszeniaUzytkownikowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrzejrzyjZgloszeniaUzytkownikowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzejrzyjZgloszeniaUzytkownikowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
