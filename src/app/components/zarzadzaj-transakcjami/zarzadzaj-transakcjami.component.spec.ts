import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ZarzadzajTransakcjamiComponent} from './zarzadzaj-transakcjami.component';

describe('ZarzadzajTransakcjamiComponent', () => {
  let component: ZarzadzajTransakcjamiComponent;
  let fixture: ComponentFixture<ZarzadzajTransakcjamiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZarzadzajTransakcjamiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZarzadzajTransakcjamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
