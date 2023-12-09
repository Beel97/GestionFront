<template>
  <div>
    <div class="flex justify-end mb-5">
      <DxButton text="nuevo" @click="onClkBtnNuevoMateria" />
    </div>
    <DxDataGrid :data-source="materiasData" key-expr="id_materia">
      <DxColumn data-field="id_materia" />
      <DxColumn data-field="nombre_materia" />
      <DxColumn data-field="id_profesor" />
      <DxColumn data-field="is_activo" caption="activo" />
      <DxColumn
        type="buttons"
        caption="Acciones"
        cell-template="buttonsTemplate"
      />
      <template #buttonsTemplate="{ data }">
        <div class="space-x-3">
          <DxButton text="editar" @click="onClkBtnEditarMateria(data)" />
          <DxButton
            text="eliminar"
            type="danger"
            @click="onClkBtnEliminarMateria(data)"
          />
        </div>
      </template>
    </DxDataGrid>
    <DxPopup v-model:visible="popUpVisible" height="auto" width="30%">
      <MateriaFrm
        :materia-data="materiaData"
        @@cancelar="onCanceledFrm"
        @@saved="onSavedFrm"
      />
    </DxPopup>
  </div>
</template>
<script setup lang="ts">
import DxPopup from "devextreme-vue/popup";
import MateriaFrm from "../Forms/MateriaFrm.vue";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { ref } from "vue";
import axios from "axios";
import type { MateriaType } from "@/types/types";

const materiasData = ref<MateriaType[] | null>();
const materiaData = ref<MateriaType | null>();
const popUpVisible = ref(false);

function getMateriasData() {
  axios
    .get<MateriaType[]>("http://localhost:5088/api/Materia/get-materias")
    .then((Response) => {
      materiasData.value = Response.data;
    });
}

function getMateriaData(id: string) {
  axios
    .get<MateriaType>("http://localhost:5088/api/Materia/get-materia/" + id)
    .then((Response) => {
      materiaData.value = Response.data;
      popUpVisible.value = true;
    });
}

function deleteMateria(id: string) {
  axios
    .delete("http://localhost:5088/api/Materia/delete-materia/" + id)
    .then((Response) => {
      getMateriasData();
    });
}

getMateriasData();

function onClkBtnNuevoMateria() {
  popUpVisible.value = true;
  materiaData.value = null;
}

function onClkBtnEditarMateria(data: any) {
  getMateriaData(data.data.id_materia);
}

function onClkBtnEliminarMateria(data: any) {
  deleteMateria(data.data.id_materia);
}

function onSavedFrm() {
  getMateriasData();
  popUpVisible.value = false;
  materiaData.value = undefined;
}

function onCanceledFrm() {
  popUpVisible.value = false;
  materiaData.value = undefined;
}
</script>
