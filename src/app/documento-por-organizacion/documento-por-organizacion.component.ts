import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from '../services/organizacion.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ListarDocumentosComponent } from '../listar-documentos/listar-documentos.component';
export interface Documento {
  id: number;
  nombreArchivo: string;
  fechaCreacion: string;
  organizacion: { id: number; nombre: string };
}

@Component({
  selector: 'app-documento-por-organizacion',
  templateUrl: './documento-por-organizacion.component.html',
  styleUrls: ['./documento-por-organizacion.component.css'],
})
export class DocumentoPorOrganizacionComponent implements OnInit {
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
    private organizacionService: OrganizacionService
  ) {}
  ngOnInit(): void {
    this.cargarDocumentos();
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

  cargarDocumentos(): void {
    this.organizacionService.getOrganizaciones().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('datos', this.dataSource);
      },
      error: (err) => {
        console.error('Error al cargar organizaciones:', err);
      },
    });
  }
}
