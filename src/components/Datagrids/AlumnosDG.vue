<template>
  <div>
    <div class="flex justify-end mb-5">
      <DxButton text="nuevo" @click="onClkBtnNuevoAlumno" />
    </div>
    <DxDataGrid :data-source="alumnosData" key-expr="id_alumno">
      <DxColumn data-field="id_alumno" />
      <DxColumn data-field="nombre_alumno" />
      <DxColumn data-field="apellidos_alumno" />
      <DxColumn data-field="is_activo" />
      <DxColumn
        type="buttons"
        caption="Acciones"
        cell-template="buttonsTemplate"
      />
      <template #buttonsTemplate="{ data }">
        <div class="space-x-3">
          <DxButton text="editar" @click="onClkBtnEditarAlumno(data)" />
          <DxButton
            text="eliminar"
            type="danger"
            @click="onClkBtnEliminarAlumno(data)"
          />
        </div>
      </template>
    </DxDataGrid>
    <DxPopup v-model:visible="popUpVisible" height="auto" width="70%">
      <AlumnoFrm
        :alumno-data="alumnoData"
        @@cancelar="onCanceledFrm"
        @@saved="onSavedFrm"
      />
    </DxPopup>
  </div>
</template>
<script setup lang="ts">
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import DxPopup from "devextreme-vue/popup";
import DxButton from "devextreme-vue/button";
import AlumnoFrm from "../Forms/AlumnoFrm.vue";
import { ref } from "vue";
import axios from "axios";
import type { AlumnoType } from "@/types/types";
const alumnosData = ref<AlumnoType[] | null>();
const alumnoData = ref<AlumnoType | null>();
const popUpVisible = ref(false);

function getAlumnosData() {
  axios
    .get<AlumnoType[]>("http://localhost:5088/api/Alumno/get-alumnos")
    .then((Response) => {
      alumnosData.value = Response.data;
    });
}

function getAlumnoData(id: string) {
  axios
    .get<AlumnoType>("http://localhost:5088/api/Alumno/get-alumno/" + id)
    .then((Response) => {
      alumnoData.value = Response.data;
      popUpVisible.value = true;
    });
}

function deleteAlumno(id: string) {
  axios
    .delete("http://localhost:5088/api/Alumno/delete-alumno/" + id)
    .then((Response) => {
      getAlumnosData();
    });
}

getAlumnosData();

function onClkBtnNuevoAlumno() {
  popUpVisible.value = true;
  alumnoData.value = null;
}

function onClkBtnEditarAlumno(data: any) {
  getAlumnoData(data.data.id_alumno);
}

function onClkBtnEliminarAlumno(data: any) {
  deleteAlumno(data.data.id_alumno);
}

function onSavedFrm() {
  getAlumnosData();
  popUpVisible.value = false;
  alumnoData.value = undefined;
}

function onCanceledFrm() {
  popUpVisible.value = false;
  alumnoData.value = undefined;
}
</script>
