import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { AdminComponent } from './admin/admin.component';
import { DocumentoOrganizacionesComponent } from './documento-organizaciones/documento-organizaciones.component';
import { BusquedasOrganizacionComponent } from './busquedas-organizacion/busquedas-organizacion.component';
import { ListarDocumentosComponent } from './listar-documentos/listar-documentos.component';
import { VerInspectorComponent } from './ver-inspector/ver-inspector.component';
import { DocumentoPorOrganizacionComponent } from './documento-por-organizacion/documento-por-organizacion.component';

/*const routes: Routes = [
 /*{path: '', component:HomeComponent},
 {path: 'register', component: RegistroComponent},
 {path: '**',redirectTo:''},
*/
// Ruta de login como la principal
// { path: '', component: LoginComponent },

// Ruta para el resto de la aplicación
// { path: 'home', component: HomeComponent },
// { path: 'register', component: RegistroComponent },

// Redirecciona cualquier ruta desconocida a la página de login
// { path: '**', redirectTo: '' },
//];*/
const routes: Routes = [
  // Ruta para el login (sin la plantilla)
  { path: '', component: LoginComponent },

  // Ruta principal que carga la plantilla y anida todas las rutas protegidas
  /* {
    path: '',
    component: MainLayoutComponent, // Este componente tiene tu plantilla
    children: [
      { path: 'home', component: HomeComponent }, // Esto se carga DENTRO de la plantilla
      { path: 'register', component: RegistroComponent } // Esto también
    ]
  },*/

  {
    path: '',
    component: PlantillaComponent, // Este componente tiene tu plantilla
    children: [
      { path: 'home', component: HomeComponent }, // Esto se carga DENTRO de la plantilla
      { path: 'register', component: RegistroComponent }, // Esto también
      { path: 'document', component: DocumentosComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'organizacion', component: DocumentoOrganizacionesComponent },
      { path: 'busqueda', component: BusquedasOrganizacionComponent },
      { path: 'listarDocumentos', component: ListarDocumentosComponent },
      { path: 'verInspector', component: VerInspectorComponent },
      {
        path: 'documentOrganization',
        component: DocumentoPorOrganizacionComponent,
      },
    ],
  },

  // Redirecciona cualquier ruta desconocida al login
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
