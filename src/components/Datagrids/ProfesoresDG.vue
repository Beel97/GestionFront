<template>
  <div>
    <div class="flex justify-end mb-5">
      <DxButton text="nuevo" @click="onClkBtnNuevoProfesor" />
    </div>
    <DxDataGrid :data-source="profesoresData" key-expr="id_profesor">
      <DxColumn data-field="id_profesor" />
      <DxColumn data-field="nombre_profesor" />
      <DxColumn data-field="apellidos_profesor" />
      <DxColumn data-field="is_activo" />

      <DxColumn
        type="buttons"
        caption="Acciones"
        cell-template="buttonsTemplate"
      />
      <template #buttonsTemplate="{ data }">
        <div class="space-x-3">
          <DxButton text="editar" @click="onClkBtnEditarProfesor(data)" />
          <DxButton
            text="eliminar"
            type="danger"
            @click="onClkBtnEliminarProfesor(data)"
          />
        </div>
      </template>
    </DxDataGrid>

    <DxPopup v-model:visible="popUpVisible" height="auto" width="30%">
      <ProfesorFrm
        :profesor-data="profesorData"
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
import ProfesorFrm from "../Forms/ProfesorFrm.vue";
import type { ProfesorType } from "@/types/types";
import { ref } from "vue";
import axios from "axios";

const profesoresData = ref<ProfesorType[] | null>(null);
const profesorData = ref<ProfesorType | null>();
const popUpVisible = ref(false);

function getProfesoresData() {
  axios
    .get<ProfesorType[]>("http://localhost:5088/api/Profesores/get-profesores")
    .then((Response) => {
      profesoresData.value = Response.data;
    });
}

function getProfesorData(id: string) {
  axios
    .get<ProfesorType>(
      "http://localhost:5088/api/Profesores/get-profesor/" + id
    )
    .then((Response) => {
      profesorData.value = Response.data;
      popUpVisible.value = true;
    });
}

function deleteProfesor(id: string) {
  axios
    .delete("http://localhost:5088/api/Profesores/delete-profesor/" + id)
    .then((Response) => {
      getProfesoresData();
    });
}

getProfesoresData();

function onClkBtnNuevoProfesor() {
  popUpVisible.value = true;
  profesorData.value = null;
}

function onClkBtnEditarProfesor(data: any) {
  getProfesorData(data.data.id_profesor);
}

function onClkBtnEliminarProfesor(data: any) {
  deleteProfesor(data.data.id_profesor);
}

function onSavedFrm() {
  getProfesoresData();
  popUpVisible.value = false;
  profesorData.value = undefined;
}

function onCanceledFrm() {
  popUpVisible.value = false;
  profesorData.value = undefined;
}
</script>
