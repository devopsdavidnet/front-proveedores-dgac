import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { OrganizacionService } from '../services/organizacion.service';
import { StorageService } from '../storage.service';
import { Documento } from '../documentos/documentos.component';
import { DocumentoViewerDialogComponent } from '../documento-viewer-dialog/documento-viewer-dialog.component';
@Component({
  selector: 'app-listar-documentos',
  templateUrl: './listar-documentos.component.html',
  styleUrls: ['./listar-documentos.component.css'],
})
export class ListarDocumentosComponent {
  filtroForm!: FormGroup;
  displayedColumns: string[] = ['nombreArchivo', 'fechaCreacion', 'acciones'];
  dataSource: Documento[] = [];
  datoRecibido: any;
  constructor(
    private fb: FormBuilder,
    private organizacionService: OrganizacionService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ListarDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.datoRecibido = data;
  }
  ngOnInit(): void {
    /*this.filtroForm = this.fb.group({
      organizacionId: [''],
    });*/
    console.log(' DDDDDDDDDDDDDDDDDDDDDDDD ', this.datoRecibido);
    this.cargarDocumentos();
  }

  cargarDocumentos(): void {
    this.organizacionService
      .getDocumentosByOrganizacion(this.datoRecibido)
      .subscribe({
        next: (resp) => {
          this.dataSource = resp;

          console.log('dddddddd ' + resp.value.id);
        },
        error: (err) => {
          console.error('Error al cargar documetnos', err);
        },
      });
  }

  cerrar() {
    this.dialogRef.close();
  }

  verDocumento(id: any): void {
    this.organizacionService.getArchivo(id).subscribe((file) => {
      const fileURL = URL.createObjectURL(file);
      this.dialog.open(DocumentoViewerDialogComponent, {
        width: '80%',
        height: '80%',
        data: { url: fileURL, nombre: 'doc.nombreArchivo' },
      });
    });
  }
  /*
  verDocumento(id: any): void {
    alert('dddddddddddddddd ' + id);
  }*/
}
