import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-instructores',
  templateUrl: './registro-instructores.component.html',
  styleUrls: ['./registro-instructores.component.css']
})
export class RegistroInstructoresComponent implements OnInit {

     formPersonalInstructor!:FormGroup;
  

datosRecibidos: any; // O un tipo más específico si conoces la estructura de dataActual
   constructor( private fb: FormBuilder,public dialogRef: MatDialogRef<RegistroInstructoresComponent>
  ,@Inject(MAT_DIALOG_DATA) public data: any) {
     this.formPersonalInstructor = this.fb.group({
      personal:this.fb.array([])
     });                                                             

    this.datosRecibidos=data;
    if(data && Array.isArray(data.personal)){
     console.log('entro por si array')
     this.datosRecibidos= data.personal

    }else{
     this.datosRecibidos=null;

    }
      
   

   }
  ngOnInit(): void {
    
   if(this.datosRecibidos && this.datosRecibidos.length>0){
    console.log('entro por si',this.datosRecibidos)
    this.setPersona(this.datosRecibidos);
   }else{
    console.log('entro por no');
     this.addPersona();
   }
   

  }

setPersona(personal: any[]): void{

if(Array.isArray(personal)){
   console.log('datos Array.isArrya(personal)')
   //this.personalArray.clear();
  personal.forEach(persona => {
        console.log('arrayPersona',persona);
        this.addPersona1(persona);
  });
}


 
}

 // Método para añadir una nueva aeronave al FormArray
private addPersona1(personaData?: any): void {

    this.personalArray.push(this.createPersonal(personaData));
  }


  private createPersonal(personalData?: any): FormGroup{
         if(personalData){

                console.log('personalData.nombres :', personalData?.nombres);
         }else{
            console.log('personaData.nombre: null');
         }
     
return this.fb.group({nombres: [personalData ? personalData.nombres: '', Validators.required],
      primerApellido: [personalData ? personalData.primerApellido:'', Validators.required],
      segundoApellido: [personalData ? personalData.segundoApellido:''],
      cedula: [personalData ? personalData.cedula:'', Validators.required],
      licencia: [personalData ? personalData.cedula:'', Validators.required]});

  }

   get personaArray(): FormArray{
     return this.formPersonalInstructor.get('personal') as FormArray;
   }

onSubmit():void{

  if(this.formPersonalInstructor.valid){
   console.log('Datos del formulario con datos a ser enviado:', this.formPersonalInstructor);

   this.dialogRef.close(this.formPersonalInstructor.value);
  }else{
    this.formPersonalInstructor.markAllAsTouched();
  }


}


addPersona(): void {
    const personaForm = this.fb.group({
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      cedula: ['', Validators.required],
      licencia: ['', Validators.required]
    });

    this.personalArray.push(personaForm);
  }
cerrar() {
    this.dialogRef.close();
  }

   removePersona(index: number): void {
    this.personalArray.removeAt(index);
  }

  get personalArray(): FormArray {
    return this.formPersonalInstructor.get('personal') as FormArray;
  }

}
