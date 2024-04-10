import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesWeatherComponent } from './cities-weather.component';

describe('CitiesWeatherComponent', () => {
  let component: CitiesWeatherComponent;
  let fixture: ComponentFixture<CitiesWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitiesWeatherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitiesWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
