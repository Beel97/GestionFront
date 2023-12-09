<template>
  <DxForm :formData="formData">
    <DxSimpleItem data-field="nombre_materia" />
    <DxSimpleItem
      data-field="id_profesor"
      editorType="dxSelectBox"
      :editorOptions="profesoresEditor"
    />
    <DxSimpleItem>
      <div class="w-full space-x-2">
        <DxButton text="Guardar" type="success" @click="onClkBtnGuardar" />
        <DxButton text="Cancelar" type="danger" @click="emit('@cancelar')" />
      </div>
    </DxSimpleItem>
  </DxForm>
</template>

<script setup lang="ts">
import DxForm, { DxSimpleItem } from "devextreme-vue/form";
import type { MateriaType } from "@/types/types";
import { ref, watch } from "vue";
import { DxButton } from "devextreme-vue/button";
import axios from "axios";
import { DxSelectBox } from "devextreme-vue";
import { useProfesoresSB } from "../Composables/CustomEditorOptions";

interface IProps {
  materiaData?: null | MateriaType;
}

const props = withDefaults(defineProps<IProps>(), { materiaData: undefined });
const emit = defineEmits<{ (e: "@cancelar"): void; (e: "@saved"): void }>();

const formData = ref<MateriaType | null>();

const { editorOptions } = useProfesoresSB();
const profesoresEditor = ref();

watch(editorOptions, (val) => {
  profesoresEditor.value = val;
});

watch(
  () => props.materiaData,
  (value) => {
    if (value) {
      formData.value = value;
    } else {
      formData.value = {} as MateriaType;
    }
  }
);

function addMateria(materia: MateriaType) {
  axios
    .post("http://localhost:5088/api/Materia/add-materia", materia)
    .then((Response) => {
      emit("@saved");
    });
}

function updateMateria(materia: MateriaType) {
  axios
    .put(
      "http://localhost:5088/api/Materia/update-materia/" + materia.id_materia,
      materia
    )
    .then((Response) => {
      emit("@saved");
    });
}

function onClkBtnGuardar() {
  if (formData.value) {
    if (formData.value.id_materia) {
      updateMateria(formData.value);
    } else {
      addMateria(formData.value);
    }
  }
}
</script>
