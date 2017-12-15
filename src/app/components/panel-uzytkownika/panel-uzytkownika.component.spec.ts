import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelUzytkownikaComponent} from './panel-uzytkownika.component';

describe('PanelUzytkownikaComponent', () => {
  let component: PanelUzytkownikaComponent;
  let fixture: ComponentFixture<PanelUzytkownikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanelUzytkownikaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelUzytkownikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
