import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ZlecanieTransportuPrzesylkiComponent} from './zlecanie-transportu-przesylki.component';

describe('ZlecanieTransportuPrzesylkiComponent', () => {
  let component: ZlecanieTransportuPrzesylkiComponent;
  let fixture: ComponentFixture<ZlecanieTransportuPrzesylkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZlecanieTransportuPrzesylkiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZlecanieTransportuPrzesylkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
