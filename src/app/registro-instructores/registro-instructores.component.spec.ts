import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInstructoresComponent } from './registro-instructores.component';

describe('RegistroInstructoresComponent', () => {
  let component: RegistroInstructoresComponent;
  let fixture: ComponentFixture<RegistroInstructoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroInstructoresComponent]
    });
    fixture = TestBed.createComponent(RegistroInstructoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
