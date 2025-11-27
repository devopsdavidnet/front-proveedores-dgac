import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';

import { MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef
import { OrganizacionService } from '../services/organizacion.service';
import Organizacion from '../models/Organizacion';
import Usuarios from '../models/Usuarios';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})
export class RegistroUsuarioComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private organizacionService: OrganizacionService,
    private router: Router,
    public dialogRef: MatDialogRef<RegistroComponent> // Inyecta MatDialogRef
  ) {}
  cerrar() {
    this.dialogRef.close();
  }

  /*onRegister(): void {
    if (this.registroForm.valid) {
      console.log('Formulario enviado:', this.registroForm.value);
      // Cierra el diálogo y opcionalmente pasa datos
     // this.dialogRef.close(this.registroForm.value); 
    console.log('dddddddddddddddddddd', this.registroForm.value);
    this.organizacionService.enviarProveedor(this.registroForm.value).
      subscribe({
        next:(response)=>{
           console.log('=Se envió correctamente:', response.id);
       console.log('Respuesta del servidor:', response);
      alert('Proveedor enviado con éxito!');
        }
      });




    } else {
      console.log('EEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRRRRRROOOORRRR ')
      this.registroForm.markAllAsTouched();
    }
  }
*/
  /*onRegister(): void {
this.organizacionService.enviarProveedor(this.registroForm.value).
  subscribe({
    next:(response)=>{
      const formUsuario={...this.registroForm.value}
      delete formUsuario.nombreProveedor;
      formUsuario.idProveedor = response.id; 
      
      this.organizacionService.enviarUsuario(formUsuario).
         subscribe({
          next:(resp)=>{
             alert('El registro del usuario fue con éxito!');
          }  

         })

     // console.log('Respuesta del servidor:', response);
      
    },
    error:(error)=>{
      console.error('Error al enviar el proveedor:', error);
      alert('Hubo un error al enviar el Registro. Por favor, inténtalo de nuevo.');
    },
    complete:()=>{
      console.log('La operación de envío del registro ha finalizado.');
      this.dialogRef.close(this.registroForm.value); 
    }
  });

}
*/

  onRegister(): void {
    console.log(this.registroForm.value);

    const organizacion: Organizacion = {
      nombreOrganizacion: this.registroForm.get('nombreProveedor')?.value,
      tipoExplotador: this.registroForm.get('tipoExplotador')?.value,
    };

    const usuario: Usuarios = {
      idProveedor: this.registroForm.get('')?.value,
      nombre: this.registroForm.get('nombre')?.value,
      primerApellido: this.registroForm.get('primerApellido')?.value,
      segundoApellido: this.registroForm.get('segundoApellido')?.value,
      celular: this.registroForm.get('celular')?.value,
      cedulaIdentidad: this.registroForm.get('cedulaIdentidad')?.value,
      correo: this.registroForm.get('correo')?.value,
      contrasenia: this.registroForm.get('')?.value,
    };

    console.log('valores de la organizacion', organizacion);

    this.organizacionService.enviarFormulario(organizacion).subscribe({
      next: (response) => {
        usuario.idProveedor = response.id;
        this.organizacionService.enviarUsuario(usuario).subscribe({
          next: (resp) => {
            alert('El registro del usuario fue con éxito!');
          },
          error: (error) => {
            alert(
              'El usuario con los datos que ingresaste ya fue registrado..'
            );
          },
          complete: () => {
            //    console.log('La operación de envío del registro ha finalizado.');

            this.dialogRef.close(this.registroForm.value);
          },
        });
      },
    });
  }
  onCancel(): void {
    this.dialogRef.close(); // Cierra el diálogo sin pasar datos
  }

  ngOnInit(): void {
    // Inicializa el formulario con los campos separados
    this.registroForm = this.fb.group({
      tipoExplotador: ['', Validators.required],
      nombreProveedor: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],

      // Los campos de apellido separados
      primerApellido: ['', Validators.required],
      segundoApellido: [''],

      celular: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      cedulaIdentidad: ['', Validators.required],
    });
  }

  convertirMayusculas() {
    Object.keys(this.registroForm.controls).forEach((campo) => {
      const control = this.registroForm.get(campo);

      if (control && typeof control.value === 'string') {
        control.setValue(control.value.toUpperCase(), { emitEvent: false });
      }
    });
  }
}
