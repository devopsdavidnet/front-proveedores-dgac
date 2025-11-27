import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAeronavesComponent } from './registro-aeronaves.component';

describe('RegistroAeronavesComponent', () => {
  let component: RegistroAeronavesComponent;
  let fixture: ComponentFixture<RegistroAeronavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroAeronavesComponent]
    });
    fixture = TestBed.createComponent(RegistroAeronavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
