import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ZapoznajSieZSerwisemComponent} from './zapoznaj-sie-z-serwisem.component';

describe('ZapoznajSieZSerwisemComponent', () => {
  let component: ZapoznajSieZSerwisemComponent;
  let fixture: ComponentFixture<ZapoznajSieZSerwisemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZapoznajSieZSerwisemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapoznajSieZSerwisemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
