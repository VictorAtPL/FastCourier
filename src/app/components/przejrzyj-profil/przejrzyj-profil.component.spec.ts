import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrzejrzyjProfilComponent} from './przejrzyj-profil.component';

describe('PrzejrzyjProfilComponent', () => {
  let component: PrzejrzyjProfilComponent;
  let fixture: ComponentFixture<PrzejrzyjProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrzejrzyjProfilComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzejrzyjProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
