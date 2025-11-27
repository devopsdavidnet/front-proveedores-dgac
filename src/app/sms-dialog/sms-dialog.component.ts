import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators } from '@angular/forms';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { FormArray,  FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';


interface NodoIndicador {
  label: string;
  type: 'objetivo' | 'meta' | 'indicador';
  expandable: boolean;
  level: number;
  indexPath: number[];
}

interface Indicador {
  nombreIndicador: string;
  periodicidad?: string;
  tipo?: string;
  formula?: string;
  nivelAlerta1?: string;
  nivelAlerta2?: string;
  nivelAlerta3?: string;
}

interface Meta {
  nombreMeta: string;
  indicadores: Indicador[];
}

interface Objetivo {
  nombreObjetivo: string;
  metas: Meta[];
}


@Component({
  selector: 'app-sms-dialog',
  templateUrl: './sms-dialog.component.html',
  styleUrls: ['./sms-dialog.component.css']
})
export class SmsDialogComponent implements OnInit{

datosRecibidosSms: any; 
    formRegistroIndicadores!: FormGroup;
  //treeControl = new NestedTreeControl<NodoIndicador>(node => []);
  //dataSource = new MatTreeNestedDataSource<NodoIndicador>();

  expandedNodes: Set<string> = new Set();

  treeControl = new FlatTreeControl<NodoIndicador>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener<NodoIndicador, NodoIndicador>(
    node => node,
    node => node.level,
    node => node.expandable,
    () => []
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SmsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
console.log('datos recibidos del fomalrio maestro es :', data );

  }
ngOnInit(): void {
  this.formRegistroIndicadores = this.fb.group({
    objetivos: this.fb.array([])
  });

  // ✅ Guardamos los datos recibidos
  this.datosRecibidosSms = this.data;
   console.log('****************verificamos si llega los datos :******************',this.datosRecibidosSms);
console.log('Datos recibidos en el modal:', this.data);
console.log('Tipo de datos:', typeof this.data, 'Es array:', Array.isArray(this.data));


  
  // Si ya existen datos, los cargamos
  if (Array.isArray(this.datosRecibidosSms.objetivos) /*&& this.datosRecibidosSms.length > 0*/) {
       console.log('SIIIII '+ this.datosRecibidosSms)
    this.setObjetivosIndicadores(this.datosRecibidosSms.objetivos);
  } else {
    console.log('NOOOOOOOOOOO '+ this.datosRecibidosSms)
    this.addObjetivo();

  }

  this.actualizarTree();
}



// --- GETTERS ---
  get objetivos(): FormArray {
    return this.formRegistroIndicadores.get('objetivos') as FormArray;
  }

  metas(iObjetivo: number): FormArray {
    return this.objetivos.at(iObjetivo).get('metas') as FormArray;
  }

  indicadores(iObjetivo: number, iMeta: number): FormArray {
    return (this.metas(iObjetivo).at(iMeta).get('indicadores') as FormArray);
  }

  // --- CONTROLES PARA INPUTS ---
  getNombreObjetivoControl(iObjetivo: number): FormControl {
    return this.objetivos.at(iObjetivo).get('nombreObjetivo') as FormControl;
  }

  getNombreMetaControl(iObjetivo: number, iMeta: number): FormControl {
    return this.metas(iObjetivo).at(iMeta).get('nombreMeta') as FormControl;
  }

  getNombreIndicadorControl(iObjetivo: number, iMeta: number, iInd: number): FormControl {
    return this.indicadores(iObjetivo, iMeta).at(iInd).get('nombreIndicador') as FormControl;
  }

  getPeriodicidadControl(iObjetivo: number, iMeta: number, iInd: number): FormControl {
    return this.indicadores(iObjetivo, iMeta).at(iInd).get('periodicidad') as FormControl;
  }

  getTipoIndicadorControl(iObjetivo: number, iMeta: number, iInd: number): FormControl {
    return this.indicadores(iObjetivo, iMeta).at(iInd).get('tipo') as FormControl;
  }

  getFormulaControl(iObjetivo: number, iMeta: number, iInd: number): FormControl {
    return this.indicadores(iObjetivo, iMeta).at(iInd).get('formula') as FormControl;
  }

  getNivelAlerta1Control(iObjetivo: number, iMeta: number, iInd: number): FormControl {
    return this.indicadores(iObjetivo, iMeta).at(iInd).get('nivelAlerta1') as FormControl;
  }

  getNivelAlerta2Control(iObjetivo: number, iMeta: number, iInd: number): FormControl {
    return this.indicadores(iObjetivo, iMeta).at(iInd).get('nivelAlerta2') as FormControl;
  }

  getNivelAlerta3Control(iObjetivo: number, iMeta: number, iInd: number): FormControl {
    return this.indicadores(iObjetivo, iMeta).at(iInd).get('nivelAlerta3') as FormControl;
  }


addObjetivo(obj?: any) {
    this.objetivos.push(this.fb.group({
      nombreObjetivo: [obj?.nombreObjetivo || '', Validators.required],
      metas: this.fb.array([])
    }));
    this.actualizarTree();
  }

  addMeta(iObjetivo: number, meta?: any) {
    this.metas(iObjetivo).push(this.fb.group({
      nombreMeta: [meta?.nombreMeta || '', Validators.required],
      indicadores: this.fb.array([])
    }));
    this.actualizarTree();
  }

 addIndicador(iObjetivo: number, iMeta: number, ind?: any) {
    this.indicadores(iObjetivo, iMeta).push(this.fb.group({
      nombreIndicador: [ind?.nombreIndicador || '', Validators.required],
      periodicidad: [ind?.periodicidad || ''],
      tipo: [ind?.tipo || ''],
      formula: [ind?.formula || ''],
      nivelAlerta1: [ind?.nivelAlerta1 || ''],
      nivelAlerta2: [ind?.nivelAlerta2 || ''],
      nivelAlerta3: [ind?.nivelAlerta3 || '']
    }));
    this.actualizarTree();
  }

  // --- ELIMINAR ELEMENTOS ---
  removeObjetivo(iObjetivo: number) {
    this.objetivos.removeAt(iObjetivo);
    this.actualizarTree();
  }
  
   removeMeta(iObjetivo: number, iMeta: number) {
    this.metas(iObjetivo).removeAt(iMeta);
    this.actualizarTree();
  }

  removeIndicador(iObjetivo: number, iMeta: number, iInd: number) {
    this.indicadores(iObjetivo, iMeta).removeAt(iInd);
    this.actualizarTree();
  }

setObjetivosIndicadores(data: Objetivo[]) {
  this.objetivos.clear();

  data.forEach((obj: Objetivo) => {
    this.addObjetivo(obj);
    const iObj = this.objetivos.length - 1; 

    if (Array.isArray(obj.metas)) {
      obj.metas.forEach((meta: Meta) => {
        this.addMeta(iObj, meta);
        const iMeta = this.metas(iObj).length - 1; 

        if (Array.isArray(meta.indicadores)) {
          meta.indicadores.forEach((ind: Indicador) => {
            this.addIndicador(iObj, iMeta, ind);
          });
        }
      });
    }
  });
}

actualizarTree() {
  // 1️⃣ Guardar los nodos expandidos antes de refrescar
  const expandedNodes = new Set(
    this.treeControl.expansionModel.selected.map(n => n.label)
  );

  // 2️⃣ Reconstruir los datos
  const treeData: NodoIndicador[] = [];

  this.objetivos.controls.forEach((obj, iObj) => {
    treeData.push({
      label: `Objetivo ${iObj + 1}`,
      type: 'objetivo',
      expandable: true,
      level: 0,
      indexPath: [iObj]
    });

    this.metas(iObj).controls.forEach((meta, iMeta) => {
      treeData.push({
        label: `Meta ${iMeta + 1}`,
        type: 'meta',
        expandable: true,
        level: 1,
        indexPath: [iObj, iMeta]
      });

      this.indicadores(iObj, iMeta).controls.forEach((ind, iInd) => {
        treeData.push({
          label: `Indicador ${iInd + 1}`,
          type: 'indicador',
          expandable: false,
          level: 2,
          indexPath: [iObj, iMeta, iInd]
        });
      });
    });
  });

  // 3️⃣ Asignar datos
  this.dataSource.data = treeData;

  // 4️⃣ Restaurar nodos expandidos
  this.treeControl.dataNodes.forEach(node => {
    if (expandedNodes.has(node.label)) {
      this.treeControl.expand(node);
    }
  });
}


/*

  // --- GENERAR DATOS PARA TREE ---
  actualizarTree() {
    const treeData: NodoIndicador[] = [];
    this.objetivos.controls.forEach((obj, iObj) => {
      treeData.push({
        label: `Objetivo ${iObj + 1}`,
        type: 'objetivo',
        expandable: true,
        level: 0,
        indexPath: [iObj]
      });

      this.metas(iObj).controls.forEach((meta, iMeta) => {
        treeData.push({
          label: `Meta ${iMeta + 1}`,
          type: 'meta',
          expandable: true,
          level: 1,
          indexPath: [iObj, iMeta]
        });

        this.indicadores(iObj, iMeta).controls.forEach((ind, iInd) => {
          treeData.push({
            label: `Indicador ${iInd + 1}`,
            type: 'indicador',
            expandable: false,
            level: 2,
            indexPath: [iObj, iMeta, iInd]
          });
        });
      });
    });
    this.dataSource.data = treeData;
  }

*/


  
/*setObjetivosIndicadores(objetivosIndicadores: any[]): void {
  console.log('Datos recibidos para setObjetivosIndicadores:', objetivosIndicadores);

  if (Array.isArray(objetivosIndicadores)) {
    // Limpia los objetivos actuales
    this.objetivos.clear();

    // Carga cada objetivo y sus metas/indicadores
    objetivosIndicadores.forEach(objetivo => {
      this.addObjetivoConDatos(objetivo);
    });
  } else {
    console.warn('setObjetivosIndicadores: No es un array válido.', objetivosIndicadores);
  }
}
*/






  

  

/*
  addMeta(i: number) {
    const metas = this.getMetas(i);
    const metaIndex = metas.length;
    metas.push(this.fb.group({
      nombreMeta: [''],
      indicadores: this.fb.array([]),
    }));
    setTimeout(() => {
      this.refreshTree();
      const node = this.dataSource.data.find(n => n.type === 'meta' && n.indexPath[0] === i && n.indexPath[1] === metaIndex);
      if (node) this.treeControl.expand(node);
    });
  }*/


  /*addIndicador(i: number, j: number) {
    const indicadores = this.getIndicadores(i, j);
   
indicadores.push(this.fb.group({
  nombreIndicador: [''],
  periodicidad: [''],
  tipo: [''],
  formula: [''],
  alerta1: [''],
  alerta2: [''],
  alerta3: [''],





    }));
    setTimeout(() => {
      this.refreshTree();
      const node = this.dataSource.data.find(n => n.type === 'meta' && n.indexPath[0] === i && n.indexPath[1] === j);
      if (node) this.treeControl.expand(node);
    });
  }   */


onSubmit(): void {
    if (this.formRegistroIndicadores.valid) {
       console.log("entro por si");
      this.dialogRef.close(this.formRegistroIndicadores.value);
    } else {
      
      this.formRegistroIndicadores.markAllAsTouched();
    }
  }

 cerrar(): void {
    this.dialogRef.close(null);
  }

}


