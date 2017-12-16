import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrzejrzyjUwagiComponent} from './przejrzyj-uwagi.component';

describe('PrzejrzyjUwagiComponent', () => {
  let component: PrzejrzyjUwagiComponent;
  let fixture: ComponentFixture<PrzejrzyjUwagiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrzejrzyjUwagiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzejrzyjUwagiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
