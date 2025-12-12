import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from '../services/organizacion.service';
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
  columnas: string[] = ['nombreArchivo', 'fechaCreacion', 'accion'];
  dataSource: Documento[] = [];
  constructor(private organizacionService: OrganizacionService) {}
  ngOnInit(): void {
    this.cargarDocumentos();
  }

  cargarDocumentos(): void {
    const id = 3; //this.storageService.getItem('usuarioActual').idOrganizacion;

    // const idOrg = this.filtroForm.value.organizacionId;
    this.organizacionService.getDocumentosByOrganizacion(id).subscribe({
      next: (resp) => {
        this.dataSource = resp;
        console.log('llego datos ' + this.dataSource);
      },
      error: (err) => {
        console.error('Error al cargar documetnos', err);
      },
    });
  }
}
