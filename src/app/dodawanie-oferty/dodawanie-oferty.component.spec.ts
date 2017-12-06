import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DodawanieOfertyComponent} from './dodawanie-oferty.component';

describe('DodawanieOfertyComponent', () => {
  let component: DodawanieOfertyComponent;
  let fixture: ComponentFixture<DodawanieOfertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DodawanieOfertyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodawanieOfertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
