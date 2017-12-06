import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PisanieWiadomosciComponent} from './pisanie-wiadomosci.component';

describe('PisanieWiadomosciComponent', () => {
  let component: PisanieWiadomosciComponent;
  let fixture: ComponentFixture<PisanieWiadomosciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PisanieWiadomosciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PisanieWiadomosciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
