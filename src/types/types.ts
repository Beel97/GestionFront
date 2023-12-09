export type ProfesorType = {
  id_profesor: string;
  nombre_profesor: string;
  apellidos_profesor: string;
  is_activo: boolean;
};

export type AlumnoType = {
  id_alumno: string;
  nombre_alumno: string;
  apellidos_alumno: string;
  is_activo: boolean;
};

export type CalificacionType = {
  id_calificacion: string;
  id_materia: string;
  id_alumno: string;
  calificacion: number;
  is_activo: boolean;
};

export type MateriaType = {
  id_materia: string;
  nombre_materia: string;
  id_profesor: string;
  is_activo: boolean;
};
