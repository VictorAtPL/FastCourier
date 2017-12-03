import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ZglaszanieUwagiComponent} from './zglaszanie-uwagi.component';

describe('ZglaszanieUwagiComponent', () => {
  let component: ZglaszanieUwagiComponent;
  let fixture: ComponentFixture<ZglaszanieUwagiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZglaszanieUwagiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZglaszanieUwagiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
