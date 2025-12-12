import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { Documento } from '../documentos/documentos.component';

@Injectable({
  providedIn: 'root',
})
export class OrganizacionService {
  private apiUrl = 'http://192.168.25.17:8091/api';

  constructor(private http: HttpClient) {}

  enviarFormulario(datos: any): Observable<any> {
    return this.http.post(this.apiUrl + '/organizaciones/save', datos);
  }
  //tiene que generar adminiracion y no pena
  generarReporte(nombreReporte: string, id: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl + '/organizaciones'}/${nombreReporte}/${id}`,
      {
        responseType: 'blob' as 'json',
      }
    ) as Observable<Blob>; //
  }

  enviarProveedor(datos: any): Observable<any> {
    return this.http.post(this.apiUrl + '/usuarios/guardar', datos);
  }

  // actualizar
  updateOrganizacion(id: number, org: any): Observable<any> {
    console.log('*************organizacion id: ', id);
    console.log('*************organizacion : ', org);
    return this.http.put<any>(
      `${this.apiUrl}/organizaciones/update/${id}`,
      org
    );
  }

  enviarUsuario(datos: any): Observable<any> {
    return this.http.post(this.apiUrl + '/usuarios/guardar', datos);
  }

  validarLogin(correo: any, contrasenia: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('correo', correo);
    params = params.set('contrasenia', contrasenia);

    return this.http.post(this.apiUrl + '/usuarios/login', null, {
      params: params,
    });
  }

  subirArchivo(id: number, file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id.toString());

    return this.http.post(`${this.apiUrl}/files/subir`, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text', //  si tu backend devuelve String
    });
  }

  getDocumentosByOrganizacion(idOrganizacion: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/documentos/list/${idOrganizacion}`
    );
  }

  getArchivo(documentoId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/documentos/ver/${documentoId}`, {
      responseType: 'blob',
    });
  }

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  guardarUsuarios(usuarios: any[]): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/actualizar`, usuarios);
  }

  getOrganizaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/organizaciones`);
  }

  guardarDatosInspector(datos: any): Observable<any> {
    console.log('*****************  datos :', datos.tipo);
    if (datos.tipo == 'CIAC/CEAC') {
      datos.rolUsuario = 3;
    }
    if (datos.tipo == 'OMA') {
      datos.rolUsuario = 4;
    }
    if (datos.tipo == 'AOC') {
      datos.rolUsuario = 5;
    }
    return this.http.post(this.apiUrl + '/usuarios/guardarInspector', datos);
  }
}
