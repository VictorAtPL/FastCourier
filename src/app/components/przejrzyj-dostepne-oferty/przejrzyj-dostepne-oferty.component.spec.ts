import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrzejrzyjDostepneOfertyComponent} from './przejrzyj-dostepne-oferty.component';

describe('PrzejrzyjDostepneOfertyComponent', () => {
  let component: PrzejrzyjDostepneOfertyComponent;
  let fixture: ComponentFixture<PrzejrzyjDostepneOfertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrzejrzyjDostepneOfertyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzejrzyjDostepneOfertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
