import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrzejrzyjZgloszeniaComponent} from './przejrzyj-zgloszenia.component';

describe('PrzejrzyjZgloszeniaComponent', () => {
  let component: PrzejrzyjZgloszeniaComponent;
  let fixture: ComponentFixture<PrzejrzyjZgloszeniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrzejrzyjZgloszeniaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzejrzyjZgloszeniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
