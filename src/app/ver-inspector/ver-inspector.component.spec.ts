import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInspectorComponent } from './ver-inspector.component';

describe('VerInspectorComponent', () => {
  let component: VerInspectorComponent;
  let fixture: ComponentFixture<VerInspectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerInspectorComponent]
    });
    fixture = TestBed.createComponent(VerInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
