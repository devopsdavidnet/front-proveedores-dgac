import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroAeronavesComponent } from '../registro-aeronaves/registro-aeronaves.component';
import { MatDialog } from '@angular/material/dialog';
import { SmsDialogComponent } from '../sms-dialog/sms-dialog.component';
import { RegistroInstructoresComponent } from '../registro-instructores/registro-instructores.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponentComponent } from './confirm-dialog-component/confirm-dialog-component.component';
import { Router } from '@angular/router';
import { OrganizacionService } from '../services/organizacion.service';
import { SubirDocumentoComponent } from '../subir-documento/subir-documento.component';
import { CompartirService } from '../services/compartir-service.service';
import { Observable } from 'rxjs';
import { DocumentoViewerDialogComponent } from '../documento-viewer-dialog/documento-viewer-dialog.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  formRegistro!: FormGroup;
  usuario$!: Observable<any>; // observable del usuario
  idProveedor!: number;
  // inyecta Router
  // Inicializa la variable para que el botón esté deshabilitado
  isDisabled: boolean = true;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private organizacionService: OrganizacionService,
    private compartirService: CompartirService
  ) {
    this.formRegistro = this.fb.group({
      /* informacion general de la organización*/
      nombreOrganizacion: ['', Validators.required],
      tipoExplotador: ['', Validators.required],
      departamento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefonoOrganizacion: ['', Validators.required],
      correoOrganizacion: ['', Validators.required],
      fechaInicialCertificacion: ['', Validators.required],
      fechaExpiracionCertificacion: ['', Validators.required],
      numeroCertificado: ['', Validators.required],
      numeroResolucionAdministrativa: ['', Validators.required],
      resolucionTipoOrganizacion: ['', Validators.required],
      otraResolucionTipoOrganizacion: [''],
      tipoOperacion: [''],
      otroTipoOperacion: [''],
      aeronaveInfo: [''],
      objetivosMetasIndicadoresInfo: [''],
      tieneSms: [''],
      fechaAceptacionSms: [''],
      especificacionEdto: [''],
      especificacionPbn: [''],
      especificacionCat: [''],
      especificacionEfb: [''],
      especificacionRvsm: [''],
      especificacionMp: [''],
      especificacionLl: [''],
      especificacionHets: [''],
      especificacionMedevac: [''],
      epecificacionOtro: [''],
      otraEspecificacion: [''],
      nacionalidadOrganizacion: [''],
      tamanoOrganizacion: [''],
      complejidadOrganizacion: [''],
      capacidadOrganizacionEstructuraAeronave: [false],
      capacidadOrganizacionMotorAeronave: [false],
      capacidadOrganizacionHelices: [false],
      capacidadOrganiazacionRadio: [false],
      capacidadOrganizacionSistema: [false],
      capacidadOrganizacionAccesorios: [false],
      capacidadOrganizacionServicio: [false],
      otroCapacidadOrganizacion: [false],
      otroCapacidadOrganizaciones: [''],
      tipo1: [''],
      tipo2: [''],
      tipo3: [''],
      tipo4: [''],
      tipo5: [''],
      certificadoTrainair: [''],
      fechaExpiracionCertificadoTrainair: [''],
      certificadoIosa: [''],
      fechaExpiracionCertificadoIosa: [''],
      certificadoIsago: [''],
      fechaExpiracionIsago: [''],
      certificadoIss: [''],
      fechaExpiracionIss: [''],
      certificadoClac: [''],
      fechaExpiracionClac: [''],
      certificadoRolls: [''],
      fechaExpiracionRoll: [''],
      certificadoAirbus: [''],
      fechaExpiracionAirbus: [''],
      certificadoRedalc: [''],
      fechaExpiracioncertificadoRedalc: [''],
      certificadoGadm: [''],
      fechaExpiracionGadm: [''],
      certificadoBoeign: [''],
      fechaExpiracionBoeign: [''],
      certificadoRasg: [''],
      fechaExpiracionRasg: [''],
      certificadoCoscap: [''],
      fechaExpiracionCoscap: [''],
      certificadoCalidad: [''],
      fechaExpiracionCalidad: [''],
      certificadoTrabajo: [''],
      fechaExpiracionTrabajo: [''],
      certificadoMultinacional: [''],
      fechaExpiracionMultinacional: [''],
      certificadoGcso: [''],
      fechaExpiracionGcso: [''],
      nombreGerenteResponsable: [''],
      telefonoGerenteResponsable: [''],
      correoGerenteResponsable: [''],
      fechaDesignacionGerenteResponsable: [''],
      nombreResponsableOperaciones: [''],
      telefonoResponsableOperaciones: [''],
      correoResponsableOperaciones: [''],
      fechaDesignacionResponsableOperaciones: [''],
      nombreResponsableMantenimiento: [''],
      telefonoResponsableMantenimiento: [''],
      correoResponsableMantenimiento: [''],
      fechaDesignacionResponsableMantenimiento: [''],
      nombreResponsableSms: [''],
      telefonoResponsableSms: [''],
      correoResponsableSms: [''],
      fechaDesignacionResponsableSms: [''],
      nombreResponsableCalidad: [''],
      telefonoResponsableCalidad: [''],
      correoResponsableCalidad: [''],
      fechaDesignacionResponsableCalidad: [''],
      nombreJefePiloto: [''],
      telefonoJefePiloto: [''],
      correoJefePiloto: [''],
      fechaDesignacionJefePiloto: [''],
      nombreJefeInstruccion: [''],
      telefonoJefeInstruccion: [''],
      correoJefeInstruccion: [''],
      fechaDesignacionJefeInstruccion: [''],
      /*nombreGerenteResponsableCIAC:[''],
telefonoGerenteResponsableCIAC:[''],
correoGerenteResponsableCIAC:[''],    
fechaDesignacionGerenteResponsableCIAC:[''],*/
      nombreJefeVueloCIAC: [''],
      telefonoJefeVueloCIAC: [''],
      correoJefeVueloCIAC: [''],
      fechaDesignacionJefeVueloCIAC: [''],
      nombreJefeInstruccionTeoricaCIAC: [''],
      telefonoJefeInstruccionTeoricaCIAC: [''],
      correoJefeInstruccionTeoricaCIAC: [''],
      fechaDesignacionJefeInstruccionTeoricaCIAC: [''],
      nombreAsistenteInstructorCiac: [''],
      telefonoAsistenteInstructorCiac: [''],
      correoAsistenteInstructorCiac: [''],
      fechaDesignacionAsistenteInstructorCiac: [''],
      instructoresCertificadosInfo: [''],
    });
  }

  ngOnInit() {
    this.compartirService.usuario$.subscribe((usuario) => {
      if (usuario) {
        console.log('Usuario logueado:', usuario);

        this.idProveedor = usuario.idOrganizacion;
        this.formRegistro.patchValue({
          nombreOrganizacion: usuario.nombreOrganizacion,
          tipoExplotador: usuario.tipoExplotador,
          departamento: usuario.departamentoId,
          direccion: usuario.direccion,
          telefonoOrganizacion: usuario.telefono,
          correoOrganizacion: usuario.correo,
          fechaInicialCertificacion: usuario.fechaInicialCertificacion,
          fechaExpiracionCertificacion: usuario.fechaExpiracionCertificacion,
          numeroCertificado: usuario.numeroCertificado,
          numeroResolucionAdministrativa: usuario.numeroCertificado,
          resolucionTipoOrganizacion: usuario.resolucionClaseCertificacion,
          otraResolucionTipoOrganizacion:
            usuario.otraResolucionClaseCertificacion,
          tieneSms: usuario.tieneSms,
          fechaAceptacionSms: usuario.fechaAceptacion,
          objetivosMetasIndicadoresInfo: usuario.objetivosIndicadores, //json
          aeronaveInfo: usuario.aerovanvesRegistradas, //json
          nacionalidadOrganizacion: usuario.nacionalidadOrganizacion,
          tamanoOrganizacion: usuario.tamanoOrganizacion,
          complejidadOrganizacion: usuario.complejidadOrganizacion,
          capacidadOrganizacion: usuario.capacidadesOrganizacion, //json
          certificados: usuario.certificados, //json
          personalDirectorio: usuario.personalDirectorio,
          tipoOperacion: usuario.tipoOperacion,
          otroTipoOperacion: usuario.tipoOperacion,
          instructoresCertificadosInfo: usuario.personalCertificado,
        });

        /*    let responsableActual = '';

usuario.personalDirectorio.forEach((item: any) => {
     console.log('nombre :',item.nombre);
     console.log('valor :',item.valor);
});*/

        let responsableActual = '';

        usuario.tipoCiacCeac.forEach((item: any) => {
          switch (item.nombre) {
            case 'Tipo 1':
              this.formRegistro.patchValue({ tipo1: !!item.valor });
              break;
            case 'Tipo 2':
              this.formRegistro.patchValue({ tipo2: !!item.valor });
              break;
            case 'Tipo 3':
              this.formRegistro.patchValue({ tipo3: !!item.valor });
              break;
            case 'CEAC RAB-142':
              this.formRegistro.patchValue({ tipo4: !!item.valor });
              break;
            case 'CIAC RAB-147':
              this.formRegistro.patchValue({ tipo5: !!item.valor });
              break;
          }
        });

        if (
          usuario.tipoExplotador == 'AOC' ||
          usuario.tipoExplotador === 'OMA'
        ) {
          usuario.personalDirectorio.forEach((item: any) => {
            console.log('>>> nombre:', item.nombre, 'valor:', item.valor);

            switch (item.nombre.trim()) {
              // ==== Gerente Responsable ====
              case 'Gerente Responsable':
                responsableActual = 'GerenteResponsable';
                this.formRegistro.patchValue({
                  nombreGerenteResponsable: item.valor,
                });
                break;

              // ==== Responsable de Mantenimiento ====

              case 'Responsable de Mantenimiento':
                responsableActual = 'ResponsableMantenimiento';
                this.formRegistro.patchValue({
                  nombreResponsableMantenimiento: item.valor,
                });
                break;

              // ==== Responsable de SMS ====
              case 'Responsable de SMS':
                responsableActual = 'ResponsableSms';
                this.formRegistro.patchValue({
                  nombreResponsableSms: item.valor,
                });
                break;

              // ==== Responsable de Calidad ====
              case 'Responsable de Calidad':
                responsableActual = 'ResponsableCalidad';
                this.formRegistro.patchValue({
                  nombreResponsableCalidad: item.valor,
                });
                break;

              // == RESPONSABLE DE OPERACIONES
              case 'Responsable de Operaciones':
                responsableActual = 'ResponsableOperaciones';
                this.formRegistro.patchValue({
                  nombreResponsableOperaciones: item.valor,
                });
                break;

              case 'Responsable de Operaciones':
                responsableActual = 'ResponsableOperaciones';
                this.formRegistro.patchValue({
                  nombreResponsableOperaciones: item.valor,
                });
                break;
              case 'Jefe de Pilotos':
                responsableActual = 'JefePiloto';
                this.formRegistro.patchValue({ nombreJefePiloto: item.valor });
                break;

              // ==== Campos comunes ====
              case 'Teléfono':
                this.formRegistro.patchValue({
                  [`telefono${responsableActual}`]: item.valor,
                });
                break;

              case 'Correo':
              case 'Correo ':
                this.formRegistro.patchValue({
                  [`correo${responsableActual}`]: item.valor,
                });
                break;

              case 'Fecha Designación':
                this.formRegistro.patchValue({
                  [`fechaDesignacion${responsableActual}`]: item.valor
                    ? new Date(item.valor).toISOString().split('T')[0]
                    : null,
                });
                break;
            }
          });
        }

        if (usuario.tipoExplotador === 'CIAC') {
          usuario.personalDirectorio.forEach((item: any) => {
            console.log('>>> nombre:', item.nombre, 'valor:', item.valor);

            switch (item.nombre.trim()) {
              // ==== Gerente Responsable ====
              case 'Gerente Responsable':
                responsableActual = 'GerenteResponsable';
                this.formRegistro.patchValue({
                  nombreGerenteResponsable: item.valor,
                });
                break;

              // ==== Responsable de Mantenimiento ====

              case 'Responsable de Mantenimiento':
                responsableActual = 'ResponsableMantenimiento';
                this.formRegistro.patchValue({
                  nombreResponsableMantenimiento: item.valor,
                });
                break;

              case 'Jefe de Vuelo':
                responsableActual = 'JefeVueloCIAC';
                this.formRegistro.patchValue({
                  nombreJefeVueloCIAC: item.valor,
                });
                break;

              case 'Jefe de Instrucción':
                responsableActual = 'JefeInstruccionTeoricaCIAC';
                this.formRegistro.patchValue({
                  nombreJefeInstruccionTeoricaCIAC: item.valor,
                });
                break;

              case 'Asistente Instructor':
                responsableActual = 'AsistenteInstructorCiac';

                this.formRegistro.patchValue({
                  nombreAsistenteInstructorCiac: item.valor,
                });
                break;

              // ==== Campos comunes ====
              case 'Teléfono':
                this.formRegistro.patchValue({
                  [`telefono${responsableActual}`]: item.valor,
                });
                break;

              case 'Correo':
              case 'Correo ':
                this.formRegistro.patchValue({
                  [`correo${responsableActual}`]: item.valor,
                });
                break;

              case 'Fecha Designación':
                this.formRegistro.patchValue({
                  [`fechaDesignacion${responsableActual}`]: item.valor
                    ? new Date(item.valor).toISOString().split('T')[0]
                    : null,
                });
                break;
            }
          });
        }

        usuario.certificadosEspecificosAprobados.forEach((item: any) => {
          switch (item.nombre) {
            case 'EDTO':
              this.formRegistro.patchValue({
                especificacionEdto: !!item.valor,
              });
              break;
            case 'PBN':
              this.formRegistro.patchValue({ especificacionPbn: !!item.valor });
              break;
            case 'CAT II/III':
              this.formRegistro.patchValue({ especificacionCat: !!item.valor });
              break;
            case 'EFB':
              this.formRegistro.patchValue({ especificacionEfb: !!item.valor });
              break;
            case 'RVSM':
              this.formRegistro.patchValue({
                especificacionRvsm: !!item.valor,
              });
              break;
            case 'Mercancias Peligrosas':
              this.formRegistro.patchValue({ especificacionMp: !!item.valor });
              break;
            case 'Línea Larga':
              this.formRegistro.patchValue({ especificacionLl: !!item.valor });
              break;
            case 'HETS':
              this.formRegistro.patchValue({
                especificacionHets: !!item.valor,
              });
              break;
            case 'MEDEVAC':
              this.formRegistro.patchValue({
                especificacionMedevac: !!item.valor,
              });
              break;
            case 'Otro':
              this.formRegistro.patchValue({ epecificacionOtro: !!item.valor });
              this.formRegistro.patchValue({
                otraEspecificacion: item.otroNombre,
              });
              break;
          }
        });

        usuario.capacidadesOrganizacion.forEach((item: any) => {
          switch (item.nombre) {
            case 'Estructura de Aeronaves':
              this.formRegistro.patchValue({
                capacidadOrganizacionEstructuraAeronave: !!item.valor,
              });
              break;
            case 'Motores de Aeronaves':
              this.formRegistro.patchValue({
                capacidadOrganizacionMotorAeronave: !!item.valor,
              });
              break;
            case 'Hélices':
              this.formRegistro.patchValue({
                capacidadOrganizacionHelices: !!item.valor,
              });
              break;
            case 'Rádio (Aviónica)':
              this.formRegistro.patchValue({
                capacidadOrganiazacionRadio: !!item.valor,
              });
              break;
            case 'Sistemas de Computadoras':
              this.formRegistro.patchValue({
                capacidadOrganizacionSistema: !!item.valor,
              });
              break;
            case 'Accesorios':
              this.formRegistro.patchValue({
                capacidadOrganizacionAccesorios: !!item.valor,
              });
              break;
            case 'Servicios Especializados':
              this.formRegistro.patchValue({
                capacidadOrganizacionServicio: !!item.valor,
              });
              break;
            case 'Otro':
              this.formRegistro.patchValue({
                otroCapacidadOrganizacion: !!item.valor,
                otroCapacidadOrganizaciones: item.otroNombre || '',
              });
              break;
          }
        });

        usuario.certificados.forEach((item: any) => {
          switch (item.nombre) {
            case 'TRAINAIR PLUS (OACI)':
              this.formRegistro.patchValue({
                certificadoTrainair: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionCertificadoTrainair: item.fechaExpiracion,
              });
              break;
            case 'Certificacion IOSA (IATA Operational Safety Audit)':
              this.formRegistro.patchValue({
                certificadoIosa: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionCertificadoIosa: item.fechaExpiracion,
              });
              break;
            case 'Certificacion ISAGO (IATA Safety Audit for Ground Operations)':
              this.formRegistro.patchValue({
                certificadoIsago: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionIsago: item.fechaExpiracion,
              });
              break;
            case 'ISS (IATA Safety Strategy)':
              this.formRegistro.patchValue({
                certificadoIss: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionIss: item.fechaExpiracion,
              });
              break;
            case 'CLAC (Comisión Latinoamericana de Aviación Civil)':
              this.formRegistro.patchValue({
                certificadoClac: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionClac: item.fechaExpiracion,
              });
              break;
            case 'Programa de Intercambio de Rolls-Royce':
              this.formRegistro.patchValue({
                certificadoRolls: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionRoll: item.fechaExpiracion,
              });
              break;
            case 'Airbus Safety Program':
              this.formRegistro.patchValue({
                certificadoAirbus: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionAirbus: item.fechaExpiracion,
              });
              break;
            case 'Red de Escuelas Aeronáuticas de América Latina y el Caribe (REDALC)':
              this.formRegistro.patchValue({
                certificadoRedalc: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracioncertificadoRedalc: item.fechaExpiracion,
              });
              break;
            case 'GADM (Global Aviation Data Management)':
              this.formRegistro.patchValue({
                certificadoGadm: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionGadm: item.fechaExpiracion,
              });
              break;
            case 'Programa Boeing Safety Exchange':
              this.formRegistro.patchValue({
                certificadoBoeign: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionBoeign: item.fechaExpiracion,
              });
              break;
            case 'RASG-PA (Regional Aviation Safety Group - Pan America)':
              this.formRegistro.patchValue({
                certificadoRasg: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionRasg: item.certificado,
              });
              break;
            case 'COSCAP (Cooperative Development of Operational Safety and Continuing Airworthiness Programmes)':
              this.formRegistro.patchValue({
                certificadoCoscap: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionCoscap: item.fechaExpiracion,
              });
              break;
            case 'Certificacion ISO - CALIDAD':
              this.formRegistro.patchValue({
                certificadoCalidad: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionCalidad: item.fechaExpiracion,
              });
              break;
            case 'Certificación ISO - SEGURIDAD EN EL TRABAJO':
              this.formRegistro.patchValue({
                certificadoTrabajo: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionTrabajo: item.fechaExpiracion,
              });
              break;
            case 'Certificación Multinacional (SRVSOP) - OMA/CIAC':
              this.formRegistro.patchValue({
                certificadoMultinacional: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionMultinacional: item.fechaExpiracion,
              });
              break;
            case 'GRUPO DE COORNINACIÓN PAR LA SEGURIDAD OPERACIONAL (GCSO) - INDUSTRIA BOLIVI':
              this.formRegistro.patchValue({
                certificadoGcso: !!item.certificado,
              });
              this.formRegistro.patchValue({
                fechaExpiracionGcso: item.fechaExpiracion,
              });
              break;
          }
        });
      }
    });

    this.formRegistro.get('tipoExplotador')?.valueChanges.subscribe((valor) => {
      const tipoOperacionControl = this.formRegistro.get('tipoOperacion');
      const otroTipoOperacionControl =
        this.formRegistro.get('otroTipoOperacion');

      if (valor !== 'CIAC') {
        tipoOperacionControl?.reset();
        otroTipoOperacionControl?.reset();
      }
    });

    // También resetea el campo 'otroTipoOperacion' si cambia el valor de 'tipoOperacion'
    /*this.formRegistro.get('tipoOperacion')?.valueChanges.subscribe((valor) => {
    if (valor !== '7') {
      this.formRegistro.get('otroTipoOperacion')?.reset();
    }
  });*/
    /*
  this.formRegistro.get('tipoExplotador')?.valueChanges.subscribe(nuevoValor => {
    if (nuevoValor) {
      // Resetear formulario principal
      this.formRegistro.reset();

      // Volver a poner el valor seleccionado
      this.formRegistro.get('tipoExplotador')?.setValue(nuevoValor, { emitEvent: false });

      // Emitir evento para que los modales también se reseteen
     // this.resetFormService.triggerReset();
    }
  });*/
  }

  onSMSChange(event: any): void {
    const dataActualSms = this.formRegistro.get(
      'objetivosMetasIndicadoresInfo'
    )?.value;

    if (event.checked) {
      const dialogRef = this.dialog.open(SmsDialogComponent, {
        width: '1000px',
        disableClose: true,
        data: dataActualSms,
        position: {
          top: '100px',
        },
      });
      dialogRef.afterClosed().subscribe((resultadoSMS) => {
        if (resultadoSMS) {
          console.log(
            'Datos de objetivo metas e indicadores llego de Modal:',
            resultadoSMS
          );
          this.formRegistro
            .get('objetivosMetasIndicadoresInfo')
            ?.setValue(resultadoSMS);
        } else {
          this.formRegistro.get('tieneSms')?.setValue(false);
        }
      });
    }
  }

  /*  convertirMayusculas() {
  const valor = this.formRegistro.get('nombreOrganizacion')?.value || '';
  this.formRegistro.get('nombreOrganizacion')?.setValue(valor.toUpperCase(), { emitEvent: false });
}*/

  convertirMayusculas() {
    Object.keys(this.formRegistro.controls).forEach((campo) => {
      const control = this.formRegistro.get(campo);

      if (control && typeof control.value === 'string') {
        control.setValue(control.value.toUpperCase(), { emitEvent: false });
      }
    });
  }

  registroAeronaves(): void {
    console.log('LLEGOOOOOOOOOOOOOOOOOOOOOOOOOO');

    const dataActual = this.formRegistro.get('aeronaveInfo')?.value;

    ///console.log('DAVID APAZA :',(this.formRegistro.get('aeronaveInfo')?.value).marca);
    const dialogRef = this.dialog.open(RegistroAeronavesComponent, {
      width: '1000px',
      disableClose: true,
      data: dataActual,
      position: {
        top: '100px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Datos del SMS aeronaves:', result);
        // Aquí puedes asignar los datos al formulario principal, por ejemplo:
        this.formRegistro.get('aeronaveInfo')?.setValue(result);
      }
    });
  }

  /*
 onEnviarFormulario() {
  if (this.formRegistro.valid) {
    const datosJSON = this.formRegistro.value;

    // Enviar los datos por consola (puedes cambiar por un servicio HTTP)
    console.log('Datos a enviar en JSON:', JSON.stringify(datosJSON));

    // Si deseas enviarlo a un backend
    // this.http.post('URL_API', datosJSON).subscribe(...)
  } else {
    console.warn('Formulario no válido');

    this.formRegistro.markAllAsTouched();
  }
}
*/
  /*
onEnviarFormulario() {
  if (this.formRegistro.valid) {
    const datosJSON = this.formRegistro.value;

    // Simulación de envío (puedes cambiarlo por un servicio HTTP)
    console.log('Datos a enviar en JSON:', JSON.stringify(datosJSON));

    // Mostrar notificación de éxito
    this.snackBar.open('Formulario enviado con éxito ✅', 'Cerrar', {
      duration: 3000, // milisegundos
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'] // clase CSS opcional
    });

    // Si quieres enviar al backend:
    // this.http.post('URL_API', datosJSON).subscribe(...)
  } else {
    this.snackBar.open('Por favor complete todos los campos requeridos ⚠️', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });

    this.formRegistro.markAllAsTouched();
  }
}
*/

  /*onEnviarFormulario() {
  if (this.formRegistro.valid) {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent);

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === true) {
        // Usuario confirmó "Sí"
        const datosJSON = this.formRegistro.value;
        console.log('Datos a enviar en JSON:', JSON.stringify(datosJSON));
        this.snackBar.open('Formulario enviado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });

      this.formRegistro.reset();
      this.router.navigate(['/HomeComponent']);

        // Aquí llama a backend si quieres
        // this.http.post('URL_API', datosJSON).subscribe(...)
      }
      // Si resultado es false o undefined, no hace nada (canceló)

    });

    

  } else {
    this.snackBar.open('Por favor complete todos los campos requeridos ', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });

    this.formRegistro.markAllAsTouched();
  }
} */

  onGuardarEnviar() {
    console.log('onGuardarEnviar  DAVID APAZA');
    const dialogRef = this.dialog.open(SubirDocumentoComponent);
  }

  onRevisarFormulario() {
    console.log('onrevisarFormulario ADOLFO');
    if (this.formRegistro.valid) {
      //const dialogRef = this.dialog.open(ConfirmDialogComponentComponent);

      // dialogRef.afterClosed().subscribe((resultado) => {
      // if (resultado === true) {
      //const datosJSON = this.formRegistro.value;
      const valores = this.formRegistro.value;

      console.log('HOYOOOO##################HOYYYYYYY');
      console.log(this.formRegistro.value);

      //   console.log(datosJSON);
      // Llamar al servicio
      switch (valores.tipoExplotador) {
        case 'CIAC':
          valores.personalDirectorio = [
            {
              nombre: 'Gerente Responsable',
              valor: valores.nombreGerenteResponsable,
            },
            {
              nombre: 'Teléfono',
              valor: valores.telefonoGerenteResponsable,
            },
            { nombre: 'Correo ', valor: valores.correoGerenteResponsable },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionGerenteResponsable,
            },
            { nombre: 'Jefe de Vuelo', valor: valores.nombreJefeVueloCIAC },
            { nombre: 'Teléfono', valor: valores.telefonoJefeVueloCIAC },
            { nombre: 'Correo ', valor: valores.correoJefeVueloCIAC },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionJefeVueloCIAC,
            },
            {
              nombre: 'Jefe de Instrucción',
              valor: valores.nombreJefeInstruccionTeoricaCIAC,
            },
            {
              nombre: 'Teléfono',
              valor: valores.telefonoJefeInstruccionTeoricaCIAC,
            },
            {
              nombre: 'Correo ',
              valor: valores.correoJefeInstruccionTeoricaCIAC,
            },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionJefeInstruccionTeoricaCIAC,
            },
            {
              nombre: 'Asistente Instructor',
              valor: valores.nombreAsistenteInstructorCiac,
            },
            {
              nombre: 'Teléfono',
              valor: valores.telefonoAsistenteInstructorCiac,
            },
            {
              nombre: 'Correo ',
              valor: valores.correoAsistenteInstructorCiac,
            },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionAsistenteInstructorCiac,
            },
          ];
          break;
        case 'OMA':
          valores.personalDirectorio = [
            {
              nombre: 'Gerente Responsable',
              valor: valores.nombreGerenteResponsable,
            },
            {
              nombre: 'Teléfono',
              valor: valores.telefonoGerenteResponsable,
            },
            { nombre: 'Correo ', valor: valores.correoGerenteResponsable },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionGerenteResponsable,
            },
            {
              nombre: 'Responsable de Mantenimiento',
              valor: valores.nombreResponsableMantenimiento,
            },
            {
              nombre: 'Teléfono',
              valor: valores.telefonoResponsableMantenimiento,
            },
            {
              nombre: 'Correo ',
              valor: valores.correoResponsableMantenimiento,
            },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionResponsableMantenimiento,
            },
            {
              nombre: 'Responsable de SMS',
              valor: valores.nombreResponsableSms,
            },
            { nombre: 'Teléfono', valor: valores.telefonoResponsableSms },
            { nombre: 'Correo ', valor: valores.correoResponsableSms },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionResponsableSms,
            },
            {
              nombre: 'Responsable de Calidad',
              valor: valores.nombreResponsableCalidad,
            },
            {
              nombre: 'Teléfono',
              valor: valores.telefonoResponsableCalidad,
            },
            { nombre: 'Correo ', valor: valores.correoResponsableCalidad },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionResponsableCalidad,
            },
          ];
          break;
        case 'AOC':
          valores.personalDirectorio = [
            {
              nombre: 'Gerente Responsable',
              valor: valores.nombreGerenteResponsable,
            },
            {
              nombre: 'Teléfono',
              valor: valores.telefonoGerenteResponsable,
            },
            { nombre: 'Correo ', valor: valores.correoGerenteResponsable },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionGerenteResponsable,
            },
            {
              nombre: 'Responsable de Operaciones',
              valor: valores.nombreResponsableOperaciones,
            },
            {
              nombre: 'Teléfono',
              valor: valores.telefonoResponsableOperaciones,
            },
            {
              nombre: 'Correo ',
              valor: valores.correoResponsableOperaciones,
            },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionResponsableOperaciones,
            },
            {
              nombre: 'Responsable de Mantenimiento',
              valor: valores.nombreResponsableMantenimiento,
            },
            {
              nombre: 'Teléfono',
              valor: valores.telefonoResponsableMantenimiento,
            },
            {
              nombre: 'Correo ',
              valor: valores.correoResponsableMantenimiento,
            },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionResponsableMantenimiento,
            },
            {
              nombre: 'Responsable de SMS',
              valor: valores.nombreResponsableSms,
            },
            { nombre: 'Teléfono', valor: valores.telefonoResponsableSms },
            { nombre: 'Correo ', valor: valores.correoResponsableSms },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionResponsableSms,
            },
            {
              nombre: 'Responsable de Calidad',
              valor: valores.nombreResponsableCalidad,
            },
            {
              nombre: 'Teléfono',
              valor: valores.telefonoResponsableCalidad,
            },
            { nombre: 'Correo ', valor: valores.correoResponsableCalidad },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionResponsableCalidad,
            },
            { nombre: 'Jefe de Pilotos', valor: valores.nombreJefePiloto },
            { nombre: 'Teléfono', valor: valores.telefonoJefePiloto },
            { nombre: 'Correo ', valor: valores.correoJefePiloto },
            {
              nombre: 'Fecha Designación',
              valor: valores.fechaDesignacionJefePiloto,
            },
          ];

          break;
      }
      valores.certificadosEspecificosAprobados = [
        { nombre: 'EDTO', valor: valores.especificacionEdto },
        { nombre: 'PBN', valor: valores.especificacionPbn },
        { nombre: 'CAT II/III', valor: valores.especificacionCat },
        { nombre: 'EFB', valor: valores.especificacionEfb },
        { nombre: 'RVSM', valor: valores.especificacionRvsm },
        {
          nombre: 'Mercancias Peligrosas',
          valor: valores.especificacionMp,
        },
        { nombre: 'Línea Larga', valor: valores.especificacionLl },
        { nombre: 'HETS', valor: valores.especificacionHets },
        { nombre: 'MEDEVAC', valor: valores.especificacionMedevac },
        {
          nombre: 'Otro',
          valor: valores.epecificacionOtro,
          otroNombre: valores.otraEspecificacion,
        },
      ];

      valores.certificados = [
        {
          nombre: 'TRAINAIR PLUS (OACI)',
          certificado: valores.certificadoTrainair,
          fechaExpiracion: valores.fechaExpiracionCertificadoTrainair,
        },
        {
          nombre: 'Certificacion IOSA (IATA Operational Safety Audit)',
          certificado: valores.certificadoIosa,
          fechaExpiracion: valores.fechaExpiracionCertificadoIosa,
        },
        {
          nombre:
            'Certificacion ISAGO (IATA Safety Audit for Ground Operations)',
          certificado: valores.certificadoIsago,
          fechaExpiracion: valores.fechaExpiracionIsago,
        },
        {
          nombre: 'ISS (IATA Safety Strategy)',
          certificado: valores.certificadoIss,
          fechaExpiracion: valores.fechaExpiracionIss,
        },
        {
          nombre: 'CLAC (Comisión Latinoamericana de Aviación Civil)',
          certificado: valores.certificadoClac,
          fechaExpiracion: valores.fechaExpiracionClac,
        },
        {
          nombre: 'Programa de Intercambio de Rolls-Royce',
          certificado: valores.certificadoRolls,
          fechaExpiracion: valores.fechaExpiracionRoll,
        },
        {
          nombre: 'Airbus Safety Program',
          certificado: valores.certificadoAirbus,
          fechaExpiracion: valores.fechaExpiracionAirbus,
        },
        {
          nombre:
            'Red de Escuelas Aeronáuticas de América Latina y el Caribe (REDALC)',
          certificado: valores.certificadoRedalc,
          fechaExpiracion: valores.fechaExpiracioncertificadoRedalc,
        },
        {
          nombre: 'GADM (Global Aviation Data Management)',
          certificado: valores.certificadoGadm,
          fechaExpiracion: valores.fechaExpiracionGadm,
        },
        {
          nombre: 'Programa Boeing Safety Exchange',
          certificado: valores.certificadoBoeign,
          fechaExpiracion: valores.fechaExpiracionBoeign,
        },
        {
          nombre: 'RASG-PA (Regional Aviation Safety Group - Pan America)',
          certificado: valores.certificadoRasg,
          fechaExpiracion: valores.fechaExpiracionRasg,
        },
        {
          nombre:
            'COSCAP (Cooperative Development of Operational Safety and Continuing Airworthiness Programmes)',
          certificado: valores.certificadoCoscap,
          fechaExpiracion: valores.fechaExpiracionCoscap,
        },
        {
          nombre: 'Certificacion ISO - CALIDAD',
          certificado: valores.certificadoCalidad,
          fechaExpiracion: valores.fechaExpiracionCalidad,
        },
        {
          nombre: 'Certificación ISO - SEGURIDAD EN EL TRABAJO',
          certificado: valores.certificadoTrabajo,
          fechaExpiracion: valores.fechaExpiracionTrabajo,
        },
        {
          nombre: 'Certificación Multinacional (SRVSOP) - OMA/CIAC',
          certificado: valores.certificadoMultinacional,
          fechaExpiracion: valores.fechaExpiracionMultinacional,
        },
        {
          nombre:
            'GRUPO DE COORNINACIÓN PAR LA SEGURIDAD OPERACIONAL (GCSO) - INDUSTRIA BOLIVI',
          certificado: valores.certificadoGcso,
          fechaExpiracion: valores.fechaExpiracionGcso,
        },
      ];

      valores.capacidadesOrganizacion = [
        {
          nombre: 'Estructura de Aeronaves',
          valor: valores.capacidadOrganizacionEstructuraAeronave,
        },
        {
          nombre: 'Motores de Aeronaves',
          valor: valores.capacidadOrganizacionMotorAeronave,
        },
        { nombre: 'Hélices', valor: valores.capacidadOrganizacionHelices },
        {
          nombre: 'Rádio (Aviónica)',
          valor: valores.capacidadOrganiazacionRadio,
        },
        {
          nombre: 'Sistemas de Computadoras',
          valor: valores.capacidadOrganizacionSistema,
        },
        {
          nombre: 'Accesorios',
          valor: valores.capacidadOrganizacionAccesorios,
        },
        {
          nombre: 'Servicios Especializados',
          valor: valores.capacidadOrganizacionServicio,
        },
        {
          nombre: 'Otro',
          valor: valores.otroCapacidadOrganizacion,
          otroNombre: valores.otroCapacidadOrganizaciones,
        },
      ];

      valores.tipoCiacCeac = [
        { nombre: 'Tipo 1', valor: valores.tipo1 },
        { nombre: 'Tipo 2', valor: valores.tipo2 },
        { nombre: 'Tipo 3', valor: valores.tipo3 },
        { nombre: 'CEAC RAB-142', valor: valores.tipo4 },
        { nombre: 'CIAC RAB-147', valor: valores.tipo5 },
      ];

      delete valores.tipo1;
      delete valores.tipo2;
      delete valores.tipo3;
      delete valores.tipo4;
      delete valores.tipo5;

      // Eliminar campos originales
      delete valores.especificacionEdto;
      delete valores.especificacionPbn;
      delete valores.especificacionCat;
      delete valores.especificacionEfb;
      delete valores.especificacionRvsm;
      delete valores.especificacionMp;
      delete valores.especificacionLl;
      delete valores.especificacionHets;
      delete valores.especificacionMedevac;
      delete valores.especificacionOtro;
      delete valores.otraEspecificacion;

      delete valores.capacidadOrganizacionEstructuraAeronave;
      delete valores.capacidadOrganizacionMotorAeronave;
      delete valores.capacidadOrganizacionHelices;
      delete valores.capacidadOrganiazacionRadio;
      delete valores.capacidadOrganizacionSistema;
      delete valores.capacidadOrganizacionAccesorios;
      delete valores.otroCapacidadOrganizacion;
      [
        'certificadoTrainair',
        'fechaExpiracionCertificadoTrainair',
        'certificadoIosa',
        'fechaExpiracionCertificadoIosa',
        'certificadoIsago',
        'fechaExpiracionIsago',
        'certificadoIss',
        'fechaExpiracionIss',
        'certificadoClac',
        'fechaExpiracionClac',
        'certificadoRolls',
        'fechaExpiracionRoll',
        'certificadoAirbus',
        'fechaExpiracionAirbus',
        'certificadoRedalc',
        'fechaExpiracioncertificadoRedalc',
        'certificadoGadm',
        'fechaExpiracionGadm',
        'certificadoBoeign',
        'fechaExpiracionBoeign',
        'certificadoRasg',
        'fechaExpiracionRasg',
        'certificadoCoscap',
        'fechaExpiracionCoscap',
        'certificadoCalidad',
        'fechaExpiracionCalidad',
        'certificadoTrabajo',
        'fechaExpiracionTrabajo',
        'certificadoMultinacional',
        'fechaExpiracionMultinacional',
        'certificadoGcso',
        'fechaExpiracionGcso',
      ].forEach((campo) => delete valores[campo]);

      console.log(valores);
      //this.organizacionService.enviarFormulario(valores).subscribe({
      const id = this.idProveedor; //this.compartirService.getUsuario.
      console.log('DAVID APAZA :', valores);

      this.organizacionService.updateOrganizacion(id, valores).subscribe({
        next: (response) => {
          /*this.snackBar.open('Formulario enviado con éxito ', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['snackbar-success'],
              });*/

          console.log('ddddddddddddddddddddddddddddddddddddddd');
          console.log('dddd ' + response?.id);
          //  Aquí llamas al reporte Jasper
          // Supongamos que en la respuesta viene el ID de la organización guardada
          const id = response.id; // asegúrate que tu backend lo retorne

          //this.documentosService.getArchivo(doc.id).subscribe((file) => {
          this.organizacionService
            .generarReporte('report', id)
            .subscribe((file) => {
              const fileURL = URL.createObjectURL(file);
              this.dialog.open(DocumentoViewerDialogComponent, {
                width: '60%',
                height: '80%',
                data: { url: fileURL, nombre: 'Vista Previa' },
              });
            });

          /* reportes pdf descarga 
              this.organizacionService.generarReporte('report', id).subscribe({
                next: (pdf: Blob) => {
                  // Crear nombre con fecha, minuto y segundo
                  const ahora = new Date();
                  const nombreArchivo = `dgac_reporte_${ahora.getFullYear()}${(
                    ahora.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, '0')}${ahora
                    .getDate()
                    .toString()
                    .padStart(2, '0')}_${ahora
                    .getHours()
                    .toString()
                    .padStart(2, '0')}${ahora
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}${ahora
                    .getSeconds()
                    .toString()
                    .padStart(2, '0')}.pdf`;

                  // Crear URL del blob
                  const url = window.URL.createObjectURL(pdf);

                  // Crear un link para descargar el archivo con el nombre personalizado
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = nombreArchivo;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);

                  // Revocar la URL después de descargar
                  setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                  }, 100);
                },
                error: (err) => {
                  console.error('Error al generar el reporte', err);
                },
              });
              */

          this.isDisabled = false;
          //   this.router.navigate(['/HomeComponent']);
        },
        error: (err) => {
          console.error('Error al enviar', err);
          this.snackBar.open('Error al enviar el formulario ', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        },
      });
      // }
      // });
    } else {
      this.snackBar.open(
        'Por favor complete todos los campos requeridos ⚠️',
        'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        }
      );
      this.formRegistro.markAllAsTouched();
    }
  }

  registroIndicadores(): void {
    const dialogRef = this.dialog.open(SmsDialogComponent, {
      width: '1000px',
      disableClose: true, // data: this.formRegistro.get('objetivosIndicadores')?.value || []
      data: this.formRegistro.get('objetivosMetasIndicadoresInfo')?.value || [], //  pasar datos reales
      position: {
        top: '100px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Datos del modal:', result);
        this.formRegistro
          .get('objetivosMetasIndicadoresInfo')
          ?.setValue(result);
      }
    });
  }

  registroIntructores(): void {
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
  }
}
