import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SzukanieZaawansowaneComponent} from './szukanie-zaawansowane.component';

describe('SzukanieZaawansowaneComponent', () => {
  let component: SzukanieZaawansowaneComponent;
  let fixture: ComponentFixture<SzukanieZaawansowaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SzukanieZaawansowaneComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzukanieZaawansowaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
