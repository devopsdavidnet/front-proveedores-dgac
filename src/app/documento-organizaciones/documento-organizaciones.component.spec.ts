import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoOrganizacionesComponent } from './documento-organizaciones.component';

describe('DocumentoOrganizacionesComponent', () => {
  let component: DocumentoOrganizacionesComponent;
  let fixture: ComponentFixture<DocumentoOrganizacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentoOrganizacionesComponent]
    });
    fixture = TestBed.createComponent(DocumentoOrganizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
