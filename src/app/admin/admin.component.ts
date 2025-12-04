import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizacionService } from '../services/organizacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddInspectorComponent } from '../add-inspector/add-inspector.component';

interface Personas {
  id: number;
  rolUsuario: string;
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
    'rolUsuario',
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
        rolUsuario: [u.rolUsuario],
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

  // En tu componente.ts

  // 1. Define correctamente la propiedad 'dataSource' (debe ser accesible desde la función).
  // Asumiendo que es una MatTableDataSource:
  //dataSource: MatTableDataSource<any>;

  // ... (en algún lugar de tu componente, inicializas dataSource)

  // 2. Define el getter para acceder a los datos (si dataSource es MatTableDataSource)
  get tableData(): any[] {
    // Si dataSource es MatTableDataSource, usa .data
    return this.dataSource ? this.dataSource.data : [];
  }

  getNombreRol(index: number): string | null {
    // 1. Verifica que el índice sea válido dentro del FormArray 'personas'.
    if (index >= 0 && index < this.personas.length) {
      // 2. Obtiene el FormGroup correspondiente a la fila (índice) actual.
      const formGroup = this.personas.at(index) as FormGroup;

      // 3. Obtiene el control 'rolUsuario'.
      const rolControl = formGroup.get('rolUsuario');

      if (rolControl && rolControl.value) {
        const rolValue = rolControl.value;

        // 4. Intenta extraer la propiedad 'nombreRol'.
        // Esto asume que rolValue es un objeto como { id: 1, nombreRol: "Inspector" }
        if (
          typeof rolValue === 'object' &&
          rolValue !== null &&
          rolValue.nombreRol
        ) {
          return rolValue.nombreRol;
        }

        // 5. Si es una cadena simple, la devuelve directamente (segundo caso más común).
        if (typeof rolValue === 'string') {
          return rolValue;
        }
      }
    }
    // Devuelve null o 'N/A' si el índice es inválido o el valor no se pudo extraer.
    return 'N/A';
  }
}
