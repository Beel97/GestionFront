<template>
  <div>
    <div class="flex justify-end mb-5">
      <DxButton text="nuevo" @click="onClkBtnNuevoCalificacion" />
    </div>
    <DxDataGrid :data-source="calificacionesData" key-expr="id_calificacion">
      <DxColumn data-field="id_calificacion" />
      <DxColumn data-field="id_materia" />
      <DxColumn data-field="id_alumno" />
      <DxColumn data-field="calificacion" />
      <DxColumn data-field="is_activo" />
      <DxColumn
        type="buttons"
        caption="Acciones"
        cell-template="buttonsTemplate"
      />
      <template #buttonsTemplate="{ data }">
        <div class="space-x-3">
          <DxButton text="editar" @click="onClkBtnEditarCalificacion(data)" />
          <DxButton
            text="eliminar"
            type="danger"
            @click="onClkBtnEliminarCalificacion(data)"
          />
        </div>
      </template>
    </DxDataGrid>
    <DxPopup v-model:visible="popUpVisible" height="auto" width="40%">
      <CalificacionFrm
        :calificacion-data="calificacionData"
        @@cancelar="onCanceledFrm"
        @@saved="onSavedFrm"
      />
    </DxPopup>
  </div>
</template>
<script setup lang="ts">
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { ref } from "vue";
import axios from "axios";
import { DxPopup } from "devextreme-vue/popup";
import CalificacionFrm from "../Forms/CalificacionFrm.vue";
import type { CalificacionType } from "@/types/types";
const calificacionesData = ref<CalificacionType[] | null>();
const calificacionData = ref<CalificacionType | null>();
const popUpVisible = ref(false);

function getCalificacionesData() {
  axios
    .get<CalificacionType[]>(
      "http://localhost:5088/api/Calificacion/get-calificaciones"
    )
    .then((Response) => {
      calificacionesData.value = Response.data;
    });
}

function getCalificacionData(id: string) {
  axios
    .get<CalificacionType>(
      "http://localhost:5088/api/Calificacion/get-calificacion/" + id
    )
    .then((Response) => {
      calificacionData.value = Response.data;
      popUpVisible.value = true;
    });
}

function deleteCalificacion(id: string) {
  axios
    .delete("http://localhost:5088/api/Calificacion/delete-calificacion/" + id)
    .then((Response) => {
      getCalificacionesData();
    });
}

getCalificacionesData();

function onClkBtnNuevoCalificacion() {
  popUpVisible.value = true;
  calificacionData.value = null;
}

function onClkBtnEditarCalificacion(data: any) {
  getCalificacionData(data.data.id_calificacion);
}

function onClkBtnEliminarCalificacion(data: any) {
  deleteCalificacion(data.data.id_calificacion);
}

function onSavedFrm() {
  getCalificacionesData();
  popUpVisible.value = false;
  calificacionData.value = undefined;
}

function onCanceledFrm() {
  popUpVisible.value = false;
  calificacionData.value = undefined;
}
</script>
