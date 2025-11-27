import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { formatDate } from '@angular/common';

import { OrganizacionService } from '../services/organizacion.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-subir-documento',
  templateUrl: './subir-documento.component.html',
  styleUrls: ['./subir-documento.component.css'],
})
export class SubirDocumentoComponent {
  constructor(
    public dialogRef: MatDialogRef<SubirDocumentoComponent>,
    private http: HttpClient,
    private organizacionService: OrganizacionService,
    private storageService: StorageService
  ) {}

  selectedFile: File | null = null;
  uploadProgress: number = 0;

  // Evento cuando se selecciona archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; //  se guarda el archivo
      this.uploadProgress = 0; // resetear progreso
      console.log('Archivo seleccionado:', this.selectedFile.name);
    }
  }

  // Acción al presionar "Subir"
  /* onUpload(): void {
    console.log('dddddddddddddddddddddddddd');
    if (!this.selectedFile) {
      alert('Primero selecciona un archivo');
      return;
    }

    // Aquí después puedes llamar a tu servicio para subirlo
    console.log('Subiendo archivo:', this.selectedFile.name);
  }
*/
  /* primero que funconan
  onUpload(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http
      .post('http://localhost:8091/api/files/subir', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event.type === HttpEventType.Response) {
            console.log('Respuesta del servidor:', event.body);
            alert(event.body); // muestra "El archivo se subio correctamente :salida.pdf"
          }
        },
        error: (err) => {
          console.error('Error al subir archivo', err);
        },
      });
  }*/

  /* selectedFile: File | null = null;
  uploadProgress = 0;

  constructor(
    public dialogRef: MatDialogRef<SubirDocumentoComponent>,
    private http: HttpClient
  ) {}

  // Selección del archivo
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadProgress = 0; // reiniciar
    }
  }
*/
  cerrar() {
    this.dialogRef.close();
  }
  /*
  onUpload() {
    console.log('ddddddddddddddddddddddd ');
    if (this.selectedFile) {
      console.log('ddddddddddddddddddddddd ');
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      console.log('***-_____________________________________-***');
      this.http
        .post('YOUR_UPLOAD_API_URL', formData, {
          reportProgress: true,
          observe: 'events',
        })
        .subscribe((event) => {
          // Lógica para manejar el progreso de subida
          // y cerrar el diálogo al finalizar
          this.dialogRef.close();
        });
    }
  }*/
  /*
  onUpload(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const id = 123; // o el id que tengas en tu componente
    formData.append('id', id.toString());

    this.http
      .post('http://localhost:8091/api/files/subir', formData, {
        reportProgress: true,
        observe: 'events',
        responseType: 'text', // si tu backend devuelve String
      })
      .subscribe({
        next: (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event.type === HttpEventType.Response) {
            console.log('Respuesta del servidor:', event.body);
            alert(event.body);
          }
        },
        error: (err) => {
          console.error('Error al subir archivo', err);
        },
      });
  }*/
  onUpload(): void {
    if (!this.selectedFile) return;

    const id = this.storageService.getItem('usuarioActual').idOrganizacion;

    console.log('usuario David APAZA:  id :', id);

    this.organizacionService.subirArchivo(id, this.selectedFile).subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log('Respuesta del servidor:', event.body);
          alert(event.body);
        }
      },
      error: (err) => {
        console.error('Error al subir archivo', err);
        this.uploadProgress = 0;
      },
    });
  }
}
