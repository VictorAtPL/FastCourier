import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrzejrzyjOferteComponent} from './przejrzyj-oferte.component';

describe('PrzejrzyjOferteComponent', () => {
  let component: PrzejrzyjOferteComponent;
  let fixture: ComponentFixture<PrzejrzyjOferteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrzejrzyjOferteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzejrzyjOferteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
