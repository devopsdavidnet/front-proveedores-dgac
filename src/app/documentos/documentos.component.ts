import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { OrganizacionService } from '../services/organizacion.service';
import { DocumentoViewerDialogComponent } from '../documento-viewer-dialog/documento-viewer-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../service/storage.service';

export interface Documento {
  id: number;
  nombreArchivo: string;
  fechaCreacion: string;
  organizacion: { id: number; nombre: string };
}

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
})
export class DocumentosComponent implements OnInit {
  filtroForm!: FormGroup;
  displayedColumns: string[] = ['nombreArchivo', 'fechaCreacion', 'acciones'];
  dataSource: Documento[] = [];
  constructor(
    private fb: FormBuilder,
    private organizacionService: OrganizacionService,
    private dialog: MatDialog,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    /*this.filtroForm = this.fb.group({
      organizacionId: [''],
    });*/

    this.cargarDocumentos();
  }

  cargarDocumentos(): void {
    const id = this.storageService.getItem('usuarioActual').idOrganizacion;
    console.log('david APAZA', id);
    // const idOrg = this.filtroForm.value.organizacionId;

    this.organizacionService.getDocumentosByOrganizacion(id).subscribe({
      next: (resp) => {
        this.dataSource = resp;
      },
      error: (err) => {
        console.error('Error al cargar documetnos', err);
      },
    });
  }

  verDocumento(doc: Documento): void {
    console.log('DAVIDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDd');
    console.log('RRRRRRRRRRRRRRRr ', doc.id);
    console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');

    this.organizacionService.getArchivo(doc.id).subscribe((file) => {
      const fileURL = URL.createObjectURL(file);
      this.dialog.open(DocumentoViewerDialogComponent, {
        width: '80%',
        height: '80%',
        data: { url: fileURL, nombre: doc.nombreArchivo },
      });
    });
  }
}
