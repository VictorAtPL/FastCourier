import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ZglaszanieTransakcjiComponent} from './zglaszanie-transakcji.component';

describe('ZglaszanieTransakcjiComponent', () => {
  let component: ZglaszanieTransakcjiComponent;
  let fixture: ComponentFixture<ZglaszanieTransakcjiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZglaszanieTransakcjiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZglaszanieTransakcjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
