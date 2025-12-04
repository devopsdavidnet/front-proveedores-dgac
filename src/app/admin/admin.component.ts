import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizacionService } from '../services/organizacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddInspectorComponent } from '../add-inspector/add-inspector.component';

interface Personas {
  id: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  correo: string;
  estadoRegistro: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  form!: FormGroup;
  columnas: string[] = [
    'nombre',
    'primerApellido',
    'segundoApellido',
    'correo',
    'estadoRegistro',
  ];
  estados = ['PE', 'AC', 'IN'];
  dataSource = new MatTableDataSource<FormGroup>();
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private organizacionService: OrganizacionService
  ) {
    this.form = this.fb.group({
      personas: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  get personas(): FormArray {
    return this.form.get('personas') as FormArray;
  }

  cargarUsuarios() {
    this.organizacionService
      .listarUsuarios()
      .subscribe((usuarios: Personas[]) => {
        console.log('ddddddddddddddddddddd', usuarios);
        usuarios.forEach((u) => this.addPersona(u));
        this.dataSource.data = this.personas.controls as FormGroup[];
      });
  }

  addPersona(u: Personas) {
    this.personas.push(
      this.fb.group({
        id: [u.id],
        nombre: [u.nombre],
        primerApellido: [u.primerApellido],
        segundoApellido: [u.segundoApellido],
        correo: [u.correo],
        estadoRegistro: [u.estadoRegistro],
      })
    );
  }

  adicionarInspector() {
    const dialogRef = this.dialog.open(AddInspectorComponent, {
      width: '1000px',
      disableClose: true,
      position: {
        top: '100px',
      },
    });

    /*

    const dialogRef = this.dialog.open(RegistroInstructoresComponent, {
          width: '1000px',
          disableClose: true, // data: this.formRegistro.get('objetivosIndicadores')?.value || []
          data: this.formRegistro.get('instructoresCertificadosInfo')?.value || [], //  pasar datos reales
          position: {
            top: '100px',
          },
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            console.log('Datos del modal de instructores :', result);
            this.formRegistro.get('instructoresCertificadosInfo')?.setValue(result);
          }
        });
*/
  }

  guardar() {
    const usuarios = this.form.value.personas;
    console.log('usuarios', usuarios);
    this.organizacionService.guardarUsuarios(usuarios).subscribe({
      next: (res) => {
        console.log('Guardado', res);
        this.snackBar.open('Formulario enviado con éxito ', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      },
      error: (err) => {
        console.error(' Error al guardar', err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filterPredicate = (row: any, filter: string) => {
      const formGroup = row as FormGroup;
      return formGroup
        .get('primerApellido')
        ?.value.toLowerCase()
        .includes(filter);
    };

    this.dataSource.filter = filterValue;
  }
}
