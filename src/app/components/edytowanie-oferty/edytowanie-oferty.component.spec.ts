import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EdytowanieOfertyComponent} from './edytowanie-oferty.component';

describe('EdytowanieOfertyComponent', () => {
  let component: EdytowanieOfertyComponent;
  let fixture: ComponentFixture<EdytowanieOfertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EdytowanieOfertyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdytowanieOfertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
