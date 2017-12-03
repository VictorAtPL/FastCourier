import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DodawanieRegulaminuComponent} from './dodawanie-regulaminu.component';

describe('DodawanieRegulaminuComponent', () => {
  let component: DodawanieRegulaminuComponent;
  let fixture: ComponentFixture<DodawanieRegulaminuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodawanieRegulaminuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodawanieRegulaminuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
