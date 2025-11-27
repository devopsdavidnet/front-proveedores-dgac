import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CompartirService } from '../services/compartir-service.service';
import { StorageService } from '../service/storage.service';
@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.css'],
})
export class PlantillaComponent {
  title = 'Proveedor de Servicio';
  @ViewChild(MatSidenav)
  sidenave!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  constructor(
    private storageService: StorageService,
    private observer: BreakpointObserver,
    private compartirService: CompartirService
  ) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 700px)']).subscribe((screenSize) => {
      console.log(
        'usario compartido plantilla :',
        this.compartirService.getUsuario
      );
      console.log('usuario : ' + this.compartirService.usuario$);
      console.log('storage', this.storageService.getItem('usuarioActual'));

      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenave.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenave.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
  closeSidenav() {
    if (this.isMobile) {
      this.sidenave.close();
    }
  }
}
