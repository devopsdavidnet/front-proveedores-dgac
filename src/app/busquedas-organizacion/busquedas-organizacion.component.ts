import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-busquedas-organizacion',
  templateUrl: './busquedas-organizacion.component.html',
  styleUrls: ['./busquedas-organizacion.component.css'],
})
export class BusquedasOrganizacionComponent {
  form!: FormGroup;

  opciones = [
    { value: 'aeronaves', label: 'Matrícula' },
    { value: 'instructor', label: 'Instructor' },
    { value: 'personal', label: 'Personal Directorio' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      termino: [''],
      categoria: ['aeronaves'],
    });
  }

  buscar() {
    const { termino, categoria } = this.form.value;
    console.log('Buscando:', termino, 'en', categoria);
  }
}
