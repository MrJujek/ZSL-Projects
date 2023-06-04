import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WpiszZarobkiComponent } from './wpisz-zarobki.component';

describe('WpiszZarobkiComponent', () => {
  let component: WpiszZarobkiComponent;
  let fixture: ComponentFixture<WpiszZarobkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WpiszZarobkiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WpiszZarobkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
