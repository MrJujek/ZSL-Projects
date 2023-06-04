import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseYearsComponent } from './choose-years.component';

describe('ChooseYearsComponent', () => {
  let component: ChooseYearsComponent;
  let fixture: ComponentFixture<ChooseYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseYearsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
