import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from '../services/organizacion.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ListarDocumentosComponent } from '../listar-documentos/listar-documentos.component';
@Component({
  selector: 'app-documento-organizaciones',
  templateUrl: './documento-organizaciones.component.html',
  styleUrls: ['./documento-organizaciones.component.css'],
})
export class DocumentoOrganizacionesComponent implements OnInit {
  form!: FormGroup;

  dataSource = new MatTableDataSource<any>();
  columnas: string[] = [
    'nombreOrganizacion',
    'tipoExplotador',
    'departamentoId',
    'telefono',
    'correo',
    'acciones',
  ];
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private organizacionService: OrganizacionService
  ) {}

  ngOnInit(): void {
    /*this.cargarOrganizaciones();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.nombreOrganizacion.toLowerCase().includes(filter);
    };*/
    // inicializar form
    this.form = this.fb.group({
      filtro: [''],
    });

    // suscripción al filtro
    this.form.get('filtro')?.valueChanges.subscribe((valor: string) => {
      this.dataSource.filter = valor.trim().toLowerCase();
    });

    // cargar datos desde API
    this.cargarOrganizaciones();

    // configurar filtro personalizado
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.nombreOrganizacion.toLowerCase().includes(filter);
    };
  }

  cargarOrganizaciones(): void {
    this.organizacionService.getOrganizaciones().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error al cargar organizaciones:', err);
      },
    });
  }

  verDetalle(element: any) {
    /*alert(`
      id:${element.id}
      Nombre: ${element.nombreOrganizacion}
      Tipo: ${element.tipoExplotador}
      Departamento: ${element.departamentoId}
      Teléfono: ${element.telefono}
      Correo: ${element.correo}
    `);*/

    const dialogRef = this.dialog.open(ListarDocumentosComponent, {
      width: '1000px',
      disableClose: true,
      data: element.id,
      position: {
        top: '100px',
      },
    });

    /*dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Datos del SMS aeronaves:', result);
        // Aquí puedes asignar los datos al formulario principal, por ejemplo:
        this.formRegistro.get('aeronaveInfo')?.setValue(result);
      }
    });*/
  }
}
