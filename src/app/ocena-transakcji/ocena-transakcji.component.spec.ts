import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcenaTransakcjiComponent} from './ocena-transakcji.component';

describe('OcenaTransakcjiComponent', () => {
  let component: OcenaTransakcjiComponent;
  let fixture: ComponentFixture<OcenaTransakcjiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcenaTransakcjiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcenaTransakcjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
