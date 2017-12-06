import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EdytowaniaZapoznaniaComponent} from './edytowania-zapoznania.component';

describe('EdytowaniaZapoznaniaComponent', () => {
  let component: EdytowaniaZapoznaniaComponent;
  let fixture: ComponentFixture<EdytowaniaZapoznaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EdytowaniaZapoznaniaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdytowaniaZapoznaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
