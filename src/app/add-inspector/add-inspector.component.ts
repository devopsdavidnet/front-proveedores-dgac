import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-inspector',
  templateUrl: './add-inspector.component.html',
  styleUrls: ['./add-inspector.component.css'],
})
export class AddInspectorComponent implements OnInit {
  personaForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddInspectorComponent>,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.personaForm = this.fb.group({
      nombre: [null, [Validators.required, Validators.maxLength(255)]],
      primerApellido: [null, [Validators.required]],
      segundoApellido: [null, [Validators.required]],
      cedulaIdentidad: [null, [Validators.required]],
      celular: [null, [Validators.required]], // opcional, solo números
      correo: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  guardar(): void {
    if (this.personaForm.valid) {
      console.log('Datos enviados:', this.personaForm.value);
      // Aquí llamas a tu servicio HTTP para enviar al backend
    } else {
      this.personaForm.markAllAsTouched();
    }
  }
}
