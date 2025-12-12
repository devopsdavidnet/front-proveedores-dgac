import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OrganizacionService } from '../services/organizacion.service';

@Component({
  selector: 'app-add-inspector',
  templateUrl: './add-inspector.component.html',
  styleUrls: ['./add-inspector.component.css'],
})
export class AddInspectorComponent implements OnInit {
  personaForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddInspectorComponent>,
    private fb: FormBuilder,
    private organizacionService: OrganizacionService
  ) {}
  ngOnInit(): void {
    this.personaForm = this.fb.group({
      nombre: [null, [Validators.required, Validators.maxLength(255)]],
      primerApellido: [null, [Validators.required]],
      segundoApellido: [null, [Validators.required]],
      cedulaIdentidad: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      cargo: ['Inspector'],
      correo: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      rolUsuario: [],
      // rolUsuario: [null, [Validators.required]],
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

  guardarInspector(): void {
    if (this.personaForm.valid) {
      this.organizacionService
        .guardarDatosInspector(this.personaForm.value)
        .subscribe({
          next: (response) => {
            console.log('se registro correctamente');
          },
          error: (error) => {
            console.log('hubo un error en la solicitud', error);
          },
          complete: () => {
            console.log('se completo correctamente');
          },
        });

      console.log('Datos enviados del Inspector:', this.personaForm.value);
      // Aquí llamas a tu servicio HTTP para enviar al backend
      //     } else {
      this.personaForm.markAllAsTouched();
    }
  }
}
