import axios from "axios";
import { ref, reactive, watch } from "vue";

export function useAlumnosSB() {
  const editorOptions = reactive({
    items: [],
    displayExpr: "nombre_alumno",
    valueExpr: "id_alumno",
  });
  function getAlumnosData() {
    axios
      .get("http://localhost:5088/api/Alumno/get-alumnos")
      .then((Response) => {
        editorOptions.items = Response.data;
      });
  }

  getAlumnosData();

  return { editorOptions };
}
export function useMateriasSB() {
  const editorOptions = reactive({
    items: [],
    displayExpr: "nombre_materia",
    valueExpr: "id_materia",
  });
  function getMateriasData() {
    axios
      .get("http://localhost:5088/api/Materia/get-materias")
      .then((Response) => {
        editorOptions.items = Response.data;
      });
  }

  getMateriasData();

  return { editorOptions };
}
export function useCalificacionesSB() {
  const editorOptions = reactive({
    items: [],
    displayExpr: "nombre_alumno",
    valueExpr: "id_calificacion",
  });
  function getCalificacionesData() {
    axios
      .get("http://localhost:5088/api/Calificacion/get-calificaciones")
      .then((Response) => {
        editorOptions.items = Response.data;
      });
  }

  getCalificacionesData();

  return { editorOptions };
}
export function useProfesoresSB() {
  const editorOptions = reactive({
    items: [],
    displayExpr: "nombre_profesor",
    valueExpr: "id_profesor",
  });
  function getProfesoresData() {
    axios
      .get("http://localhost:5088/api/Profesores/get-profesores")
      .then((Response) => {
        editorOptions.items = Response.data;
      });
  }

  getProfesoresData();

  return { editorOptions };
}
