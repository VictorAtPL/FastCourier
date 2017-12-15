import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelAdministratoraComponent} from './panel-administratora.component';

describe('PanelAdministratoraComponent', () => {
  let component: PanelAdministratoraComponent;
  let fixture: ComponentFixture<PanelAdministratoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanelAdministratoraComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdministratoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
