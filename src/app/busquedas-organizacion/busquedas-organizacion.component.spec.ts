import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedasOrganizacionComponent } from './busquedas-organizacion.component';

describe('BusquedasOrganizacionComponent', () => {
  let component: BusquedasOrganizacionComponent;
  let fixture: ComponentFixture<BusquedasOrganizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedasOrganizacionComponent]
    });
    fixture = TestBed.createComponent(BusquedasOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
