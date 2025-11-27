import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-registro-aeronaves',
  templateUrl: './registro-aeronaves.component.html',
  styleUrls: ['./registro-aeronaves.component.css']
})
export class RegistroAeronavesComponent implements OnInit {
  formAeronaves!: FormGroup;
// Esta propiedad contendrá los datos pasados desde el componente padre
  datosRecibidos: any; // O un tipo más específico si conoces la estructura de dataActual
   constructor( private fb: FormBuilder,public dialogRef: MatDialogRef<RegistroAeronavesComponent>
  ,@Inject(MAT_DIALOG_DATA) public data: any) {
   this.formAeronaves = this.fb.group({
      aeronaves: this.fb.array([])
    });
this.datosRecibidos = data;
 
// *** CAMBIO CLAVE AQUÍ: Accede a la propiedad 'aeronaves' del objeto 'data' ***
  if (data && Array.isArray(data.aeronaves)) {
    this.datosRecibidos = data.aeronaves; // ¡Ahora datosExistentes es el array de aeronaves!
  } else {
    this.datosRecibidos = null;
  }

    console.log('Datos recibidos en el modal (procesados):', this.datosRecibidos);

    /*this.formAeronaves = this.fb.group({
      aeronaves: this.fb.array([])
    });*/

   }
 
   ngOnInit(): void {
    // Solo carga los datos si existen y son un array
    if (this.datosRecibidos && this.datosRecibidos.length > 0) {
      console.log('entro por VERDAD');
      this.setAeronaves(this.datosRecibidos);
    } else {
      // Si no hay datos existentes o no son válidos, agrega al menos una aeronave vacía
      console.log('entro por FALSO');
      this.addAeronave();
    }

    
  }
   cerrar() {
    this.dialogRef.close();
  }

    // Método para llenar el FormArray con datos existentes
  // --- EL CAMBIO CRÍTICO ESTÁ AQUÍ ---
  setAeronaves(aeronaves: any[]): void {
    // Verifica explícitamente si 'aeronaves' es un array antes de usar forEach
    console.log('entro a setAeronaves :',aeronaves);
    if (Array.isArray(aeronaves)) {
      console.log('es un array entro por si');
      this.aeronaves.clear();
      aeronaves.forEach(aeronave => {
        console.log('aeronave :',aeronave);
        this.addAeronave(aeronave);
      });
    } else {
      console.warn('setAeronaves: Los datos proporcionados no son un array y no se pueden cargar.', aeronaves);
      // Opcional: manejar el caso en que no es un array, quizás añadir una aeronave vacía
      // this.addAeronave();
    }
  }


  // Método para añadir una nueva aeronave al FormArray
  addAeronave(aeronaveData?: any): void {
    this.aeronaves.push(this.createAeronaveFormGroup(aeronaveData));
  }
 // Método para crear un nuevo FormGroup para una aeronave
private createAeronaveFormGroup(aeronaveData?: any): FormGroup {
    // Asegurarse de que fechaExpiracion sea una cadena para el input type="date"
//    console.log('createAeronaveFormGroup : ',aeronaveData );

 // Verificar si aeronaveData existe antes de intentar acceder a sus propiedades
    if (aeronaveData) {
        console.log('createAeronaveFormGroup (Matrícula): ', aeronaveData?.matricula);
    } else {
        console.log('createAeronaveFormGroup: aeronaveData es undefined o null (creando aeronave vacía).');
    }


    const fecha = aeronaveData && aeronaveData.fechaExpiracion
      ? new Date(aeronaveData.fechaExpiracion).toISOString().split('T')[0]
      : '';
    
    return this.fb.group({
      matricula: [aeronaveData ? aeronaveData.matricula : '', Validators.required],
      marca: [aeronaveData ? aeronaveData.marca : '', Validators.required],
      modelo: [aeronaveData ? aeronaveData.modelo : '', Validators.required],
      serie: [aeronaveData ? aeronaveData.serie : '', Validators.required],
      fechaExpiracion: [fecha, Validators.required] // Usar la fecha formateada
    });
  }

  get aeronaves(): FormArray {
    return this.formAeronaves.get('aeronaves') as FormArray;
  }
  removeAeronave(index: number): void {
    this.aeronaves.removeAt(index);
    if (this.aeronaves.length === 0) {
      this.addAeronave();
    }
  }


    onSubmit(): void {
    if (this.formAeronaves.valid) {
      console.log('Datos del formulario enviados:', this.formAeronaves.value);
      // Aquí puedes enviar los datos a un servicio, etc.
      this.dialogRef.close(this.formAeronaves.value); // Opcional: devolver los datos al componente padre
    } else {
      this.formAeronaves.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores de validación
    }
  }
}
