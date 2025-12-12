import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './home/home.component';
import { MatInputModule } from '@angular/material/input';
import { RegistroAeronavesComponent } from './registro-aeronaves/registro-aeronaves.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { SmsDialogComponent } from './sms-dialog/sms-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';
import { RegistroInstructoresComponent } from './registro-instructores/registro-instructores.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogComponentComponent } from './registro/confirm-dialog-component/confirm-dialog-component.component';
import { SubirDocumentoComponent } from './subir-documento/subir-documento.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { AuthServiceComponent } from './auth-service/auth-service.component';
import { UsuarioAdminComponent } from './usuario-admin/usuario-admin.component';
import { DocumentosComponent } from './documentos/documentos.component'; // 👈 Import here
import { MatTableModule } from '@angular/material/table';
import { DocumentoViewerDialogComponent } from './documento-viewer-dialog/documento-viewer-dialog.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { AdminComponent } from './admin/admin.component';
import { MatButtonModule } from '@angular/material/button';
import { DocumentoOrganizacionesComponent } from './documento-organizaciones/documento-organizaciones.component';
import { BusquedasOrganizacionComponent } from './busquedas-organizacion/busquedas-organizacion.component';
import { ListarDocumentosComponent } from './listar-documentos/listar-documentos.component';
import { AddInspectorComponent } from './add-inspector/add-inspector.component';
import { VerInspectorComponent } from './ver-inspector/ver-inspector.component';
import { DocumentoPorOrganizacionComponent } from './documento-por-organizacion/documento-por-organizacion.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantillaComponent,
    RegistroComponent,
    HomeComponent,
    RegistroAeronavesComponent,
    SmsDialogComponent,
    RegistroInstructoresComponent,
    ConfirmDialogComponentComponent,
    SubirDocumentoComponent,
    LoginComponent,
    MainLayoutComponent,
    RegistroUsuarioComponent,
    AuthServiceComponent,
    UsuarioAdminComponent,
    DocumentosComponent,
    DocumentoViewerDialogComponent,
    SafeUrlPipe,
    AdminComponent,
    DocumentoOrganizacionesComponent,
    BusquedasOrganizacionComponent,
    ListarDocumentosComponent,
    AddInspectorComponent,
    VerInspectorComponent,
    DocumentoPorOrganizacionComponent,
  ],
  imports: [
    MatTableModule,
    MatProgressBarModule,
    HttpClientModule,
    MatSnackBarModule,
    MatRadioModule,
    MatTreeModule,
    MatCheckboxModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
