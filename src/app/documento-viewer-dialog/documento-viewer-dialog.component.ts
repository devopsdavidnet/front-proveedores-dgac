import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-documento-viewer-dialog',
  template: `
    <h2 mat-dialog-title>📄 {{ data.nombre }}</h2>
    <mat-dialog-content>
      <iframe
        [src]="data.url | safeUrl"
        width="100%"
        height="600px"
        style="border:none;"
      ></iframe>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button color="primary" (click)="descargar()">
        ⬇️ Descargar
      </button>
      <button mat-button (click)="cerrar()">Cerrar</button>
    </mat-dialog-actions>
  `,
})
export class DocumentoViewerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DocumentoViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string; nombre: string }
  ) {}

  cerrar(): void {
    this.dialogRef.close();
  }

  descargar(): void {
    const a = document.createElement('a');
    a.href = this.data.url;
    a.download = this.data.nombre;
    a.click();
  }
}
