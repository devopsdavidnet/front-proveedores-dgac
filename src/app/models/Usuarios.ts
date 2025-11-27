import Organizacion from "./Organizacion";

export default interface Usuarios {
    idProveedor: number;
    nombre: String;
    primerApellido :String;
    segundoApellido :String;
    celular:String;
    cedulaIdentidad:String;
    correo:String;
    contrasenia: String;   
} 
/*
export default interface Usuarios {
  id?: number;
  nombre: string;
  primerApellido: string;
  segundoApellido?: string;
  cedulaIdentidad: string;
  celular: string;
  cargo: string;
  correo: string;
  contrasenia: string;

  organizacion: {
    id: number;   // Solo mandas el ID
  };
}*/
