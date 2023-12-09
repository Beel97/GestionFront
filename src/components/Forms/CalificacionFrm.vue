<template>
  <DxForm :formData="formData" :col-count="2">
    <DxSimpleItem
      data-field="id_materia"
      :col-span="1"
      editorType="dxSelectBox"
      :editorOptions="materiaEditor"
    />
    <DxSimpleItem
      data-field="id_alumno"
      :col-span="1"
      editorType="dxSelectBox"
      :editorOptions="alumnoEditor"
    />
    <DxSimpleItem data-field="calificacion" :col-span="2" />
    <DxSimpleItem :col-span="2">
      <div class="w-full space-x-2">
        <DxButton text="Guardar" type="success" @click="onClkBtnGuardar" />
        <DxButton text="Cancelar" type="danger" @click="emit('@cancelar')" />
      </div>
    </DxSimpleItem>
  </DxForm>
</template>

<script setup lang="ts">
import DxForm, { DxSimpleItem } from "devextreme-vue/form";
import { DxSelectBox } from "devextreme-vue";
import type { CalificacionType } from "@/types/types";
import { ref, watch } from "vue";
import { DxButton } from "devextreme-vue/button";
import axios from "axios";
import {
  useAlumnosSB,
  useMateriasSB,
  useProfesoresSB,
} from "../Composables/CustomEditorOptions";

interface IProps {
  calificacionData?: null | CalificacionType;
}

const props = withDefaults(defineProps<IProps>(), {
  calificacionData: undefined,
});
const emit = defineEmits<{ (e: "@cancelar"): void; (e: "@saved"): void }>();

const formData = ref<CalificacionType | null>();

const { editorOptions } = useAlumnosSB();
const alumnoEditor = ref();
const { editorOptions: editorMateria } = useMateriasSB();
const materiaEditor = ref();

watch(editorOptions, (val) => {
  alumnoEditor.value = val;
});
watch(editorMateria, (val) => {
  materiaEditor.value = val;
});

watch(
  () => props.calificacionData,
  (value) => {
    if (value) {
      formData.value = value;
    } else {
      formData.value = {} as CalificacionType;
    }
  }
);

function addCalificacion(calificacion: CalificacionType) {
  axios
    .post(
      "http://localhost:5088/api/Calificacion/add-calificacion",
      calificacion
    )
    .then((Response) => {
      emit("@saved");
    });
}

function updateCalificacion(calificacion: CalificacionType) {
  axios
    .put(
      "http://localhost:5088/api/Calificacion/update-calificacion/" +
        calificacion.id_calificacion,
      calificacion
    )
    .then((Response) => {
      emit("@saved");
    });
}

function onClkBtnGuardar() {
  if (formData.value) {
    if (formData.value?.id_calificacion) {
      updateCalificacion(formData.value);
    } else {
      addCalificacion(formData.value);
    }
  }
}
</script>
