import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoViewerDialogComponent } from './documento-viewer-dialog.component';

describe('DocumentoViewerDialogComponent', () => {
  let component: DocumentoViewerDialogComponent;
  let fixture: ComponentFixture<DocumentoViewerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentoViewerDialogComponent]
    });
    fixture = TestBed.createComponent(DocumentoViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
