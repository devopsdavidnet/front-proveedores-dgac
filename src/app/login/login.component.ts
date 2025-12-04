import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroComponent } from '../registro/registro.component';

import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef
import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';
import Organizacion from '../models/Organizacion';
import { OrganizacionService } from '../services/organizacion.service';
import { CompartirService } from '../services/compartir-service.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Declara la variable para el formulario
  loginForm!: FormGroup;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private organizacionService: OrganizacionService,
    private compartirService: CompartirService
  ) {}

  openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(RegistroUsuarioComponent, {
      width: '550px', // Ancho del modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal de registro se cerró');
      // Puedes manejar el resultado si el componente de registro regresa algún dato
    });
  }

  // Ejemplo para cerrar sesión y eliminar los datos
  logout() {
    this.storageService.removeItem('usuarioActual');
    // Aquí rediriges al login
  }

  ngOnInit(): void {
    // Inicializa el formulario en el hook de inicialización
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onLogin(): void {
    // Si el formulario es válido, procesa el envío
    if (this.loginForm.valid) {
      this.organizacionService
        .validarLogin(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            this.compartirService.setUsuario(response);
            // Guardar los datos del usuario en localStorage
            this.storageService.setItem('usuarioActual', response);
            // Si el login es exitoso, navega a la página de inicio
            console.log('esto dato llegaron ', response.value);
            console.log('esto es el rol de usuario ', response.rolUsuario);
            this.router.navigate(['/home']);
            /*if (response.rolUsuario === 1) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }*/
          },
          error: (error) => {
            console.log('Hubo un error en la solicitud.');

            if (error.status === 404) {
              alert(error.error.message);

              if (error.error && error.error.message) {
                console.log('Mensaje del backend:', error.error.message);
              }
            } else {
              // Maneja otros tipos de errores
              console.log('Otro tipo de error. Código:', error.status);
              console.log('Objeto de error completo:', error);
            }
          },
          complete: () => {
            console.log('se completo la operacion');
          },
        });

      // Aquí va la llamada a tu servicio de autenticación

      // Si el login es exitoso, navega a la página de inicio
      // this.router.navigate(['/home']);
    } else {
      // Si el formulario es inválido, muestra los errores
      this.loginForm.markAllAsTouched();
    }
  }
}
