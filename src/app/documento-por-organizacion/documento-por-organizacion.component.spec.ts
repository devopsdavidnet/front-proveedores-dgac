import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoPorOrganizacionComponent } from './documento-por-organizacion.component';

describe('DocumentoPorOrganizacionComponent', () => {
  let component: DocumentoPorOrganizacionComponent;
  let fixture: ComponentFixture<DocumentoPorOrganizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentoPorOrganizacionComponent]
    });
    fixture = TestBed.createComponent(DocumentoPorOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
