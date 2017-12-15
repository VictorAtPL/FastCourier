import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ZglaszanieOfertyComponent} from './zglaszanie-oferty.component';

describe('ZglaszanieOfertyComponent', () => {
  let component: ZglaszanieOfertyComponent;
  let fixture: ComponentFixture<ZglaszanieOfertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZglaszanieOfertyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZglaszanieOfertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
