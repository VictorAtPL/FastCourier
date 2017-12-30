import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ZarzadzajOfertamiComponent} from './zarzadzaj-ofertami.component';

describe('ZarzadzajOfertamiComponent', () => {
  let component: ZarzadzajOfertamiComponent;
  let fixture: ComponentFixture<ZarzadzajOfertamiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZarzadzajOfertamiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZarzadzajOfertamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
